import { app } from "./app.js"
import dotenv from "dotenv"
import {createDatabaseConnection} from "./db/connection.js"

dotenv.config({path:"./config.env"})

app.listen(process.env.PORT,() => {
    console.log("server started..")
    createDatabaseConnection()
})

