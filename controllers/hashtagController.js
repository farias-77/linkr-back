import { hashtagRepository } from "../repositories/hashtagRepositories.js";
import { getPostsLikes } from "../utils/getLikes.js";

export async function getTrendingHashtags(req,res){
    try{
        const { rows: trendingHashtags} = await hashtagRepository.trendingHashtags();
        res.status(200).send(trendingHashtags);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}

export async function getSingleHashtag(req,res){
    const hashtag = req.params.hashtag;
    const limit = req.params.limit;
    console.log(hashtag,limit)
    try{
        const possibleHashtag = await hashtagRepository.hashtagExist(hashtag);
        if(possibleHashtag.rowCount === 0){
            return res.status(404).send([]);
        }
        const { id: hashtagId} = possibleHashtag.rows[0];
        
        const {rows: hashtagPosts} = await hashtagRepository.getHashtagPosts(hashtagId,limit); 
        const hashtagPostsWLikes= await getPostsLikes(hashtagPosts);
        console.log(limit - hashtagPostsWLikes.length)
        if(limit - hashtagPostsWLikes.length > 10 || hashtagPostsWLikes.length < 10){
            console.log(hashtagPostsWLikes)
            return res.status(200).send({posts: hashtagPostsWLikes, stop: true});
        }

        return res.status(200).send({posts: hashtagPostsWLikes, stop: false});
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}