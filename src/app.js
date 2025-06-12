import express, { urlencoded } from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import cors from 'cors'

app.use(cors({
    origin: process.env.ORGIGIN,
    credentials:true
}))


app.use(express.json({
    limit:"16kb"
})
)

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())


//routes

import router from "./routes/user.routes.js"

//routes declaration 
 
app.use("/api/v1/users",router)













export {app}