import "dotenv/config"
import process from "node:process"

const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY || ""
export { PORT, SECRET_KEY }