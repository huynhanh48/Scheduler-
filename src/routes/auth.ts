import express from "express"
import AuthController from "~/controllers/auth.js"
import Authorization from "~/middleware/authorization.js"
import ErrorHandler from "~/middleware/errorhandler.js"
const AuthRouter = express.Router()

AuthRouter.post("/login", ErrorHandler(AuthController.login))
AuthRouter.post("/register", ErrorHandler(AuthController.register))
AuthRouter.get("/me", Authorization, AuthController.me)

export default AuthRouter