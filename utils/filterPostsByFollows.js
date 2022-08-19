import { userRepository } from "../repositories/userRepositories.js";

export async function getPostsFilteredPerFollows(userId, posts){
    const following = await userRepository.getFollowedByUser(userId);

    const followingArray = following.rows.map(convertToArray);
    let sendablePosts = [];
    for(let i=0;i<posts.length;i++){
        if(posts[i].repostUserId === null){
            if(userId === posts[i].userId || followingArray.includes(posts[i].userId)){
                sendablePosts.push(posts[i]);
            }
        }else{
            if(userId === posts[i].repostUserId || followingArray.includes(posts[i].repostUserId)){
                sendablePosts.push(posts[i]);
            }
        }
    }
    return sendablePosts;
}

function convertToArray(objectId){
    return objectId.id
}