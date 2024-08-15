const express = require("express")
const route = express.Router()

const {getUserDetails, updateScore, getUsersBasedOnTopSpeed, getUsersBasedOnTopBetaScore} = require("../controllers/userController") 
const { authenticate } = require("../middlewares/authenticate")

route.get("/getUserDetails", authenticate, getUserDetails)
route.put("/updateScore", authenticate, updateScore)

route.get("/getUsersBasedOnTopSpeed", getUsersBasedOnTopSpeed)
route.get("/getUsersBasedOnTopBetaScore", getUsersBasedOnTopBetaScore)

module.exports =  route