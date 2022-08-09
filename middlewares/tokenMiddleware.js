import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function tokenMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "").trim();
  const secretKey = process.env.JWT_SECRET;

  try {
    const { id } = jwt.verify(token, secretKey);
    res.locals.id = id;
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
}