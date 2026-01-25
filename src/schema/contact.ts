import { PRIORITY, STATUS } from "generated/prisma/enums.js"
import z from "zod"
const ContactSchema = z.object({
    title: z.string(),
    customers: z.array(z.number()),
    cars: z.array(z.number()),
    priority: z.enum(PRIORITY).default(PRIORITY.LOW),
    status: z.enum(STATUS).default(STATUS.UNCOMPLETED),
    contents: z.array(z.string())

})

export default ContactSchema