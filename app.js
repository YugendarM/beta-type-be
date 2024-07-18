require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3500

app.get("/", (request, response) => {
    response.send({message: "Server Running"})
})

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.once("open", () => console.log("DB connected Successfully"))
db.on("error", (errorMessage) => console.log(errorMessage))

app.listen(3500, () => {
    console.log(`Server Running at http://localhost:${PORT}` )
})