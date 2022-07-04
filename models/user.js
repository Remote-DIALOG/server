const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');

const userScheman = new mongoose.Schema({
    first_name  :{type:String, default:null, require:true},
    last_name   :{type:String, default: null,require:true},
    username    :{type:String, unique:true, require:true},
    password    :{type:String,require:true},
    token       :{type:String},
    address     :{type:String},
    type        :{type:String, enum:['client', 'clinician'], default:'clinet', require:true},
    isverify    :{type:Boolean}
});
User = mongoose.model("user", userScheman);
User.doesExist = async function (username) {
    try {
        const result = await User.findOne({ username: username }).select("username").lean()
        return result;
    }catch(error) {
        console.error(error)
        return error;
    }

    
}
User.addUser = async function (username, password, first_name, last_name, type) {
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name:first_name,
            last_name: last_name,
            username: username,
            password: encryptedPassword,
            type: type,
        })
        const token = jwt.sign({user_id: user._id, username},process.env.TOKEN_KEY,{expiresIn: "2h"});
        user.token = token;
        return user;

    }catch(error) {
        console.error(error) 
        return error;
    }
}

User.delete = async function () {

}
User.update = async function () {
}
User.generate_password = function (length) {
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
module.exports = User;