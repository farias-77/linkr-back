import { metadataMiddleware } from "../middlewares/metadataMiddleware.js";
import dotenv from "dotenv";
import { hashtagVerifier } from "../utils/hashtagVerifier.js";
import { postRepository } from "../repositories/postRepositories.js";
import { getPostsLikes } from "../utils/getLikes.js";
import { getPostsFilteredPerFollows } from "../utils/filterPostsByFollows.js";
 
dotenv.config();

export async function registerPost(req, res) {
    const {url, text} =  req.body;
    const userId = res.locals.id;
    
    try {
        await postRepository.insertPost(userId, url, text, null, null); //null para repostId e null para repostUserId 

        const {rows: posts} = await postRepository.selectLastPost();
        
        await metadataMiddleware(url, posts[0].id);
        
        const hashtags = await hashtagVerifier(text);

        if (posts[0].id && hashtags.length > 0) {
            hashtags.map(hashtag => postRepository.relatePostWHashtag(posts[0].id, hashtag))
        }

        return res.sendStatus(201);
    } catch (error){ 
        return res.status(500).send(error.message);
    }
}

export async function getTimelinePosts(req,res){
    const limit = req.params.limit;
    const userId = res.locals.id;
    try{
        const {rows: tPosts} = await postRepository.getALLTimelinePosts(); 
        const timelinePosts = tPosts;
        
        
        const filteredPosts = await getPostsFilteredPerFollows(userId,timelinePosts)
        const timelinePostsWLikes= await getPostsLikes(filteredPosts);
        if(limit !== "X"){
            if(limit - timelinePostsWLikes.slice(0,limit).length > 10 || timelinePostsWLikes.slice(0,limit).length < 10){
                return res.status(200).send({posts: timelinePostsWLikes.slice(0,limit), stop: true});
            }
            const sendablePosts = timelinePostsWLikes.slice(0,limit); 
            return res.status(200).send({posts: sendablePosts, stop: false});
        }
        return res.status(200).send({posts: timelinePostsWLikes, stop: false});
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function deletePost(req, res){
    try{
        const postId = req.params.postId;

        await postRepository.deletePost(postId);

        return res.sendStatus(200);
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function editPost(req, res) {
    try {
        const postId = req.params.postId;
        const text = res.locals.text;
        
        await postRepository.updatePost(postId, text);

        const hashtags = await hashtagVerifier(text);

        if (hashtags.length > 0) {
            hashtags.map(hashtag => postRepository.relatePostWHashtag(postId, hashtag))
        };

        return res.status(200).send({ text });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function postComment(req, res){
    try{
        const postId = req.params.postId;
        const userId = res.locals.id;
        const { comment } = req.body;

        await postRepository.insertComment(postId, userId, comment);

        return res.sendStatus(200);
    }catch(error) {
        res.status(500).send(error.message);
    }
}

export async function getComments(req, res){
    try{
        const postId = req.params.postId;
        
        const { rows: comments } = await postRepository.getCommentsByPostId(postId);

        return res.status(200).send(comments);
    }catch(error) {
        res.status(500).send(error.message);
    }
}

export async function registerRepost(req, res) {
    const {userId, url, text} =  req.body;
    const repostUserId  = res.locals.id;
    const repostId = req.params.postId
    
    try {
        await postRepository.insertPost(userId, url, text, repostId, repostUserId );
        const {rows: posts} = await postRepository.selectLastPost();
        
        await metadataMiddleware(url, posts[0].id);

        const hashtags = await hashtagVerifier(text);

        if (hashtags.length > 0) {
            hashtags.map(hashtag => postRepository.relatePostWHashtag(posts[0].id, hashtag))
        }

        return res.sendStatus(201);
    } catch (error){ 
        return res.status(500).send(error.message);
    }
}

export async function getRepostCount(req, res) {
    const postId = req.params.postId; 

    try {
        const rePosts = await postRepository.countReposts(postId);
        return res.status(200).send(rePosts.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}