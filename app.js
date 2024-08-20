require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require('cookie-parser')

const userRoute = require("./routers/userRouter")
const authRoute = require("./routers/authRouter")
const lessonRoute = require("./routers/lessonRouter")

const PORT = process.env.PORT || 3500

app.get("/", (request, response) => {
    response.send({message: "Server Running"})
})

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
  }))

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/lesson", lessonRoute)

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.once("open", () => console.log("DB connected Successfully"))
db.on("error", (errorMessage) => console.log(errorMessage))

app.listen(3500, () => {
    console.log(`Server Running at http://localhost:${PORT}` )
})