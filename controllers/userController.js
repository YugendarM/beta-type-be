const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const JWT_TOKEN = process.env.JWT_TOKEN

const signupUser = async(request, response) => {
    const userData = request.body
    try{
        const isUserExist = await userModel.findOne({email: userData.email})
        console.log(isUserExist)
        if(isUserExist){
            return response.status(409).send({message: "User already Exist"})
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10)

            const newUser = new userModel({
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            })

            const addedUser = await newUser.save()
            return response.status(201).send({message: "User registered successfully"})
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

const loginUser = async(request, response) => {
    const userCredentials = request.body
    try{
        const validUser = await userModel.findOne({email: userCredentials.email}).select("+password")
        if(!validUser){
            return response.status(404).send({message: "User not registered"})
        }
        if(await bcrypt.compare(userCredentials.password, validUser.password)){
            const AUTH_TOKEN = jwt.sign({id: validUser._id}, process.env.JWT_TOKEN)
            const options = {
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 2 * 60 * 60 * 1000 
            }
            response.cookie("SessionID", AUTH_TOKEN, options)
            return response.status(200).send({message: "Login successfull"})
        }
        else{
            return response.status(401).send({message: "Wrong password"})
        }
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

const logout  = async(request, response) => {

}

const getUserDetails = async(request, response) => {
    const userData = request.user;
    try{
        return response.status(200).send(userData)
    }
    catch(error){
        return response.status(500).send({message: error.message})
    }
}

module.exports = {signupUser, loginUser, logout, getUserDetails}