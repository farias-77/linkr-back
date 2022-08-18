import { userRepository } from "../repositories/userRepositories.js";

export async function getPostsFilteredPerFollows(userId, posts){
    const following = await userRepository.getFollowedByUser(userId);

    const followingArray = following.rows.map(convertToArray);
    return posts.filter(post => followingArray.includes(post.userId) || userId === post.userId);
}

function convertToArray(objectId){
    return objectId.id
}