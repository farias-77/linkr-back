import { repostRepository } from "../repositories/repostRepositories.js"

export async function postRepost(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals;

    try {
        await repostRepository.insertRepost(postId, userId);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getReposts(req, res) {
    const { postId } = req.params;

    try {
        const allReposts = await repostRepository.getRepostByUserId(postId);
        res.send(allReposts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}