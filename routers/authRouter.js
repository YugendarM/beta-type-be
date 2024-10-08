const express = require("express")
const route = express.Router()
const {signupUser, loginUser, logout} = require("../controllers/authController")

route.post("/signup", signupUser)
route.post("/login", loginUser)
route.post("/logout", logout)

module.exports =  route