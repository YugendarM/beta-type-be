const express = require("express")
const {authenticate} = require("../middlewares/authenticate")
const { getLesson, getAllLessons } = require("../controllers/lessonController")

const route = express.Router()

route.get("/getLesson/:lessonNumber", authenticate, getLesson)
route.get("/getAllLessons", authenticate, getAllLessons)

module.exports = route