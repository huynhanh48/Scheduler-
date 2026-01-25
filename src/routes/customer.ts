import express from "express"
import CustomerController from "~/controllers/customer.js"
import Authorization from "~/middleware/authorization.js"
import ErrorHandler from "~/middleware/errorhandler.js"

const CustomerRouter = express.Router()

CustomerRouter.get("/", Authorization, ErrorHandler(CustomerController.GetAll))
CustomerRouter.get("/:id", ErrorHandler(CustomerController.GetById))
CustomerRouter.post("/", Authorization, ErrorHandler(CustomerController.Create))
CustomerRouter.put("/:id", ErrorHandler(CustomerController.Edit))
CustomerRouter.delete("/:id", ErrorHandler(CustomerController.Delete))

export default CustomerRouter