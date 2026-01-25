import express from "express"
import ContactController from "~/controllers/contact.js"
import Authorization from "~/middleware/authorization.js"
import ErrorHandler from "~/middleware/errorhandler.js"

const ContactRouter = express.Router()

ContactRouter.get("/", Authorization, ErrorHandler(ContactController.GetAll))
ContactRouter.get("/root", Authorization, ErrorHandler(ContactController.GETROOT))
ContactRouter.get("/:id", ErrorHandler(ContactController.GetById))
ContactRouter.post("/", Authorization, ErrorHandler(ContactController.Create))
ContactRouter.put("/:id", ErrorHandler(ContactController.Edit))
ContactRouter.delete("/:id", ErrorHandler(ContactController.Delete))

export default ContactRouter
