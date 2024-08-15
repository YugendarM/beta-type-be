const UserModel = require("../models/userModel") 

const getUserDetails = async(request, response) => {
    const userData = request.user;
    try{
        return response.status(200).send(userData)
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

const updateScore = async(request, response) => {
    const userData = request.user

    const scoreData = request.body
    const dataToBeUpdated = {
        betaScore : userData.betaScore + scoreData.betaScore
    }
    if(scoreData.speed > userData.topSpeed){
        dataToBeUpdated.topSpeed = scoreData.speed
        dataToBeUpdated.topAccuracy = scoreData.accuracy
    }
    try{
        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: userData._id}, 
            {$set: dataToBeUpdated},
            {new: true}
        )
        return response.status(200).send(updatedUser)
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

const getUsersBasedOnTopSpeed = async(request, response) => {
    try{
        const topUsers = await UserModel.aggregate([
            {
                $match : {topSpeed : {$gt : 0}}
            },
            {
                $sort: { topSpeed: -1},
            },
            {
                $limit: 20
            },
            {
                $project: {password: 0, _id: 0}
            }
        ])

        return response.status(200).send(topUsers)
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

const getUsersBasedOnTopBetaScore = async(request, response) => {
    try{
        const topUsers = await UserModel.aggregate([
            {
                $match : {betaScore : {$gt : 0}}
            },
            {
                $sort: { betaScore: -1},
            },
            {
                $limit: 20
            },
            {
                $project: {password: 0, _id: 0}
            }
        ])

        return response.status(200).send(topUsers)
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

module.exports = {getUserDetails, updateScore, getUsersBasedOnTopBetaScore, getUsersBasedOnTopSpeed}