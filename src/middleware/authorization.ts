import { NextFunction, Request, Response } from "express";
import BadRequest from "~/exception/bad-request.js";
import { ErrorCode } from "~/exception/root.js";
import { prisma } from "~/lib/prisma.js";
import { SECRET_KEY } from "~/secret.js";
import { deCodeJwt } from "~/utils/jwtGenerate.js";

const Authorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new BadRequest("Token is not valid !", ErrorCode.TOKEN_INVALID));
    }
    const formatToken = token?.split("Bearer ")[1] || "";
    const userId = deCodeJwt({ token: formatToken, privateKey: SECRET_KEY }) as { id: number }
    console.log("userid : ", userId.id)
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: Number(userId.id)
            }
        })
        if (user) req.user = user
        next();
    } catch (error) {
        return next(new BadRequest("User not found !", ErrorCode.NOT_FOUND))
    }
}
export default Authorization
