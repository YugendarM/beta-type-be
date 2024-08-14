const express = require("express")
const route = express.Router()

const {getUserDetails, updateScore} = require("../controllers/userController") 
const { authenticate } = require("../middlewares/authenticate")

route.get("/getUserDetails", authenticate, getUserDetails)
route.put("/updateScore", authenticate, updateScore)

module.exports =  route