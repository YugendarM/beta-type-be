const express = require("express")
const route = express.Router()

const {signupUser, loginUser, getUserDetails} = require("../controllers/userController") 
const { authenticate } = require("../middlewares/authenticate")

route.post("/signup", signupUser)
route.post("/login", loginUser)
route.get("/getUserDetails", authenticate, getUserDetails)

module.exports =  route