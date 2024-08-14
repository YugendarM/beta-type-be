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
    }
    if(scoreData.speed > userData.topSpeed && scoreData.accuracy > userData.topAccuracy){
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

module.exports = {getUserDetails, updateScore}