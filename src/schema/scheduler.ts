import z from "zod"
const SchedulerSchema = z.object({
    startDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    isNotification: z.boolean().nullish(),
    isSeen: z.boolean().nullish(),
    contacts: z.array(z.number())
})
export default SchedulerSchema