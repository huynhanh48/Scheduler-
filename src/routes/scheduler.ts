import express from "express"
import SchedulerController from "~/controllers/scheduler.js"
import Authorization from "~/middleware/authorization.js"
import ErrorHandler from "~/middleware/errorhandler.js"

const SchedulerRouter = express.Router()

SchedulerRouter.get("/", Authorization, ErrorHandler(SchedulerController.GetAll))
SchedulerRouter.get("/:id", ErrorHandler(SchedulerController.GetById))
SchedulerRouter.post("/", Authorization, ErrorHandler(SchedulerController.Create))
SchedulerRouter.put("/:id", ErrorHandler(SchedulerController.Edit))
SchedulerRouter.delete("/:id", ErrorHandler(SchedulerController.Delete))

export default SchedulerRouter
