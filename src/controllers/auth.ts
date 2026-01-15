import { NextFunction, Request, Response } from "express";
import { prisma } from "~/lib/prisma.js";
import { UserLoginSchema, UserSchema } from "~/schema/user.js";
import { SECRET_KEY } from "~/secret.js";
import { generateJwt } from "~/utils/jwtGenerate.js";
import { hashPassword, verifyPassword } from "~/utils/passwordUtitl.js";

class Auth {
    async login(req: Request, res: Response, next: NextFunction) {
        const validationUser = UserLoginSchema.parse(req.body)
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: validationUser.email
                }
            })

            if (user && verifyPassword({ passwordTarget: validationUser.password, passwordSource: user.password })) {
                const token = generateJwt({ payload: user, privateKey: SECRET_KEY ?? "" })
                return res.json({ user, token })
            }
            return res.json({ user: null })
        } catch (error) {
            return res.json(error)
        }

    }
    async register(req: Request, res: Response, next: NextFunction) {
        const validationUser = UserSchema.parse(req.body);
        try {
            const userIsValid = await prisma.user.findUnique({ where: { email: validationUser.email } })
            if (userIsValid) {
                return res.json(userIsValid)
            }
            console.log("step  on ", userIsValid)
            const newUser = await prisma.user.create({
                data: {
                    email: validationUser.email,
                    name: validationUser.name,
                    password: hashPassword({ password: validationUser.password, salt: 10 })
                }
            })
            return res.json(newUser)
        } catch (error) {
            console.log("error  ")
            return res.json(error)
        }
        res.json("error end")
    }
    async me(req: Request, res: Response, next: NextFunction) {
        res.json("login")
    }
}
const AuthController = new Auth();
export default AuthController