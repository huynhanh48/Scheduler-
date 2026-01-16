import z from "zod"
const CarSchema = z.object({
    name: z.string(),
    colors: z.array(z.string()),
    price: z.number()
})
export default CarSchema