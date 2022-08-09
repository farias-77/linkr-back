import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepositories.js";

export async function signUp(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user = {...req.body, password: passwordHash};
    const { email, password, username, userPicture } = user;

    try {
        const { rows: userExist } = await userRepository.getUser(email)

        if(userExist.length !== 0) {
            return res.sendStatus(409);
        }

        await userRepository.addUser(email, password, username, userPicture);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}