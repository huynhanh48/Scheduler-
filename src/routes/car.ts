import express from "express"
import CarController from "~/controllers/car.js"
import ErrorHandler from "~/middleware/errorhandler.js"

const CarRouter = express.Router()

CarRouter.get("/", ErrorHandler(CarController.GetAll))
CarRouter.get("/:id", ErrorHandler(CarController.GetById))
CarRouter.post("/", ErrorHandler(CarController.Create))
CarRouter.put("/:id", ErrorHandler(CarController.Edit))
CarRouter.delete("/:id", ErrorHandler(CarController.Delete))

export default CarRouter
