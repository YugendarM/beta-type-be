const express = require("express")
const route = express.Router()

const {getUserDetails, updateScore, getUsersBasedOnTopSpeed, getUsersBasedOnTopBetaScore, updateEducationResults} = require("../controllers/userController") 
const { authenticate } = require("../middlewares/authenticate")

route.get("/getUserDetails", authenticate, getUserDetails)
route.put("/updateScore", authenticate, updateScore)
route.put("/updateEducationResults", authenticate, updateEducationResults)

route.get("/getUsersBasedOnTopSpeed", getUsersBasedOnTopSpeed)
route.get("/getUsersBasedOnTopBetaScore", getUsersBasedOnTopBetaScore)

module.exports =  route