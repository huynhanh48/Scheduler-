import express from "express"
import AuthRouter from "./auth.js";
import CustomerRouter from "./customer.js";
import CarRouter from "./car.js";
import ContactRouter from "./contact.js";
import SchedulerRouter from "./scheduler.js";

const RootRouter = express.Router();

RootRouter.use("/auth", AuthRouter)
RootRouter.use("/customer", CustomerRouter)
RootRouter.use("/car", CarRouter)
RootRouter.use("/contact", ContactRouter)
RootRouter.use("/scheduler", SchedulerRouter)

export default RootRouter;