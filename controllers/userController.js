import { userRepository } from "../repositories/userRepositories.js";

export async function getUsers(req, res){
    try{
        const { rows: usersList } = await userRepository.getUsersList();

        return res.status(200).send(usersList);
    }catch (error) {
        return res.status(500).send(error.message);
    }
}