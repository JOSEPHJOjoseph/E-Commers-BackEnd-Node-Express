const mongoose = require("mongoose")

const passwordSchema = new mongoose.Schema({
    password:{
        type: "String"
    },
    createdAt: {
        type: "String"
    }
})

const usersSchema = new mongoose.Schema({
    firstName: {
        type: "String"
    },
    lastName: {
        type: "String"
    },
    email: {
        type: "String"
    },
    mobileNo: {
        type: "Number"
    },
    password: {
        type: "String",
    },
    passwordCreatedAt : {
        type : "String",
        default : new Date().toISOString()
    },
    previousPasswords:[passwordSchema]

}, { timestamps: true })

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel 