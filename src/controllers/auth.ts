import { NextFunction, Request, Response } from "express";
import BadRequest from "~/exception/bad-request.js";
import { ErrorCode } from "~/exception/root.js";
import { prisma } from "~/lib/prisma.js";
import { UserLoginSchema, UserSchema } from "~/schema/user.js";
import { SECRET_KEY } from "~/secret.js";
import { generateJwt } from "~/utils/jwtGenerate.js";
import { hashPassword, verifyPassword } from "~/utils/passwordUtitl.js";

class Auth {

    async login(req: Request, res: Response, next: NextFunction) {
        const validationUser = UserLoginSchema.parse(req.body)
        const user = await prisma.user.findUnique({
            where: {
                email: validationUser.email
            }
        })
        if (!user) return next(new BadRequest("User not valid", ErrorCode.NOT_FOUND))
        if (user && verifyPassword({ passwordTarget: validationUser.password, passwordSource: user.password })) {
            const token = generateJwt({ payload: { id: user.id }, privateKey: SECRET_KEY ?? "" })
            return res.json({ user, token })
        }
        return next(new BadRequest("Incorrect password", ErrorCode.INCORRECT_PASSWORD))
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const validationUser = UserSchema.parse(req.body);
        const userIsValid = await prisma.user.findUnique({ where: { email: validationUser.email } })
        if (userIsValid) {
            return next(new BadRequest("email already exits !", ErrorCode.ALREADY_EXITS))
        }
        const newUser = await prisma.user.create({
            data: {
                email: validationUser.email,
                name: validationUser.name,
                password: hashPassword({ password: validationUser.password, salt: 10 })
            }
        })
        return res.json(newUser)
    }

    async me(req: Request, res: Response, next: NextFunction) {
        res.json(req.user)
    }
}
const AuthController = new Auth();
export default AuthController