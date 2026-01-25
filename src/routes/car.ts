import express from "express"
import CarController from "~/controllers/car.js"
import Authorization from "~/middleware/authorization.js"
import ErrorHandler from "~/middleware/errorhandler.js"

const CarRouter = express.Router()

CarRouter.get("/", Authorization, ErrorHandler(CarController.GetAll))
CarRouter.get("/:id", ErrorHandler(CarController.GetById))
CarRouter.post("/", Authorization, ErrorHandler(CarController.Create))
CarRouter.put("/:id", ErrorHandler(CarController.Edit))
CarRouter.delete("/:id", ErrorHandler(CarController.Delete))

export default CarRouter
