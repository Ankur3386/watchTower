import express from "express"
import router from "./router/index.route"
const app = express()
import path from "path";
import dotenv from "dotenv"
import cors from "cors"
const dirname= process.cwd()

dotenv.config({
    path:path.resolve(dirname,'src/.env'),

})

app.use(cors())
app.use(express.json())

app.use('/api/v1',router)

app.listen(3000,()=>{
    console.log("connected")
})