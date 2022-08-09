import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepositories.js";

export async function signUp(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user = {...req.body, password: passwordHash};
    const { email, password, username, profilePicture } = user;

    try {
        const { rows: userExist } = await userRepository.getUser(email)

        if(userExist.length !== 0) {
            return res.sendStatus(409);
        }

        await userRepository.addUser(email, password, username, profilePicture);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {  

    try {
        const { email, password } = req.body;
        const { rows: user } = await userRepository.getUser(email);

        if(user.length === 0) {
            return res.sendStatus(401);
        }

        const checkPassword = bcrypt.compareSync(password, user[0].password);

        if(!checkPassword) {
            return res.sendStatus(401);
        }

        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user[0].id }, secretKey);

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}