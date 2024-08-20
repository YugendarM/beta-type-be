const lessonModel = require("../models/lessonModel")
const lessons = require("../data/lessons")

const getLesson = async(request, response) => {
    const userData = request.user
    const lessonNumber = Number(request.params.lessonNumber)
    try{
        const lessonData = await lessonModel.find({lesson: lessonNumber})
        return response.status(200).send(lessonData)
    }
    catch(error){
        return response.status(500).send({message:error.message})
    }
}

const getAllLessons = async(request, response) => {
    try{
        const lessonData = await lessonModel.find()
        if(lessonData.length == 0){
            const addedLessons = await lessonModel.create(lessons)
            return response.status(201).send(addedLessons)
        }
        return response.status(200).send(lessonData)
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

module.exports = {getLesson, getAllLessons}