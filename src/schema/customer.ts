import z from "zod"

const CustomerSchema = z.object(
    {
        name: z.string(),
        phoneNumber: z.string(),
        email: z.email(),
        career: z.string()
    }
)
export { CustomerSchema }