import { PRIORITY } from "generated/prisma/enums.js"
import z from "zod"
const ContactSchema = z.object({
    title: z.string(),
    body: z.string(),
    customers: z.array(z.number()),
    cars: z.array(z.number()),
    priority: z.enum(PRIORITY).default(PRIORITY.LOW)
})

export default ContactSchema