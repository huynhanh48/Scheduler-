import express from "express"
import { FRONTEND, PORT } from "./secret.js";
import cors from "cors"

import RootRouter from "./routes/index.js";
import HandleError from "./handleerror.js";
import "./scheduler.js"
const app = express();

app.use(cors({ "origin": FRONTEND, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }))
app.use(express.json())

app.use("/api", RootRouter)

app.use(HandleError)

app.listen(PORT, () => {
    console.log(`listen ${PORT}`)
})