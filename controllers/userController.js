import connection from "../dbStrategy/database.js";
import { userRepository } from "../repositories/userRepositories.js";

import { getPostsLikes } from "../utils/getLikes.js";

export async function getUsers(req, res){
    try{
        const { searchInput } = req.params;
        const { rows: usersList } = await userRepository.getUsersList();
        const filteredUsers = usersList.filter(user => user.username.startsWith(`${searchInput}`));

        return res.status(200).send(filteredUsers);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUserPosts(req, res){
    try{
        const { limit } = req.params;
        console.log(limit)
        const { id } = req.params;
        
        const { rows: postsList } = await userRepository.getPostsByUserId(id,limit);
        const { rows: usernameDb } = await userRepository.getUsername(id);

        const userPostsWLikes = await getPostsLikes(postsList);

        if(limit - userPostsWLikes.length > 10 || userPostsWLikes.length < 10){
            console.log(userPostsWLikes)
            return res.status(200).send({username: usernameDb[0].username, profilePicture: usernameDb[0].profilePicture, posts: userPostsWLikes, stop: true})
        }
        else{
            return res.status(200).send({username: usernameDb[0].username, profilePicture: usernameDb[0].profilePicture, posts: userPostsWLikes, stop: false})
        }
    }catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUserInfo(req, res){
    try{
        const id = res.locals.id;
        const { rows: user } = await userRepository.getUsername(id);

        return res.status(200).send(user);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function followUser(req, res) {
    try{
        const myId = res.locals.id;
        const  { followedId } = res.locals;
      
        await connection.query(`
        INSERT INTO follows ("followerId", "followedId")
        VALUES ($1, $2)
        `, [myId, followedId]);

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUserById(req, res){
    try{
        const id = req.params.id;
        const { rows: userInfo } = await userRepository.getUserById(id);

        return res.status(200).send(userInfo);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUserFollows(req, res){
    try{
        const id = req.params.id;
        const { rows: userFollows } = await userRepository.getUserFollows(id);

        return res.status(200).send(userFollows);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}