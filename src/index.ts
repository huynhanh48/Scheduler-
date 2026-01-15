import express from "express"
import { PORT } from "./secret.js";

import RootRouter from "./routes/index.js";
const app = express();

app.use(express.json())

app.use("/api", RootRouter)

app.listen(PORT, () => {
    console.log(`listen ${PORT}`)
})