import { userRepository } from "../repositories/userRepositories.js";

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
        const { id } = req.params;
        
        const { rows: postsList } = await userRepository.getPostsByUserId(id);
        const { rows: usernameDb } = await userRepository.getUsername(id);

        const response = {username: usernameDb[0].username, profilePicture: usernameDb[0].profilePicture, posts: postsList}

        return res.status(200).send(response);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUserInfo(req, res){
    try{
        const id = res.locals.id;
        console.log(id)
        const { rows: user } = userRepository.getUsername(id);
        console.log(user)
        return res.status(200).send(user);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}