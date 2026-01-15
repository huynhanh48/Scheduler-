import z from "zod"

const UserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
})
const UserLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export { UserSchema, UserLoginSchema }