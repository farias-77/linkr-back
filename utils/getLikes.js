import { generalRepository } from "../repositories/generalRepositories.js";

export async function getPostsLikes(posts){
    let postsWLikes = [];
    for(let i=0;i<posts.length;i++){
        const {rows: likes} = await generalRepository.getPostsLikes(posts[i].postId)
        const numLikes = likes.length;
        let whoLiked = [];
        for(let j=0;j<likes.length;j++){
            whoLiked[j] = likes[j].username;
        }
        postsWLikes[i] = {...posts[i],whoLiked,numLikes }
    }
    return postsWLikes;
}