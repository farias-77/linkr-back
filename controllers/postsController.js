import connection from "../dbStrategy/database.js";
import { metadataMiddleware } from "../middlewares/metadataMiddleware.js";
import dotenv from "dotenv";
import { hashtagVerifier } from "../utils/hashtagVerifier.js";
import { postRepository } from "../repositories/postRepositories.js";
import { getPostsLikes } from "../utils/getLikes.js";
 
dotenv.config();

export async function registerPost(req, res) {
    const {url, text} =  req.body;
    const userId = res.locals.id;
    console.log(url,text)
    
    try {
        await postRepository.insertPost(userId, url, text);
        
        const {rows: posts} = await postRepository.selectLastPost();
        
        await metadataMiddleware(url, posts[0].id);

        const hashtags = await hashtagVerifier(text);

        if (hashtags.length > 0) {
            await hashtags.map(hashtag => postRepository.relatePostWHashtag(posts[0].id, hashtag))
        }

        return res.sendStatus(201);
    } catch (error){ 
        return res.status(500).send(error.message);
    }
}

export async function getTimelinePosts(req,res){
    try{
        const {rows: timelinePosts} = await postRepository.getTimelinePosts(); 
        const timelinePostsWLikes= await getPostsLikes(timelinePosts);

        return res.status(200).send(timelinePostsWLikes);
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
        const text = req.params.text;

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