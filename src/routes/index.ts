import express from "express"
import AuthRouter from "./auth.js";

const RootRouter = express.Router();

RootRouter.use("/auth", AuthRouter)

export default RootRouter;