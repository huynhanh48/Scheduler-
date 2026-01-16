import express from "express"
import AuthRouter from "./auth.js";
import CustomerRouter from "./customer.js";
import CarRouter from "./car.js";

const RootRouter = express.Router();

RootRouter.use("/auth", AuthRouter)
RootRouter.use("/customer", CustomerRouter)
RootRouter.use("/car", CarRouter)

export default RootRouter;