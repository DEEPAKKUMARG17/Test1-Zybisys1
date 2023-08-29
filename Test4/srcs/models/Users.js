const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const UserSchema=new mongoose.Schema({
    email:{
        type: String
    },
    password:
    {
     type:Number
    }
})
UserSchema.plugin(passportLocalMongoose);
const MyUser=mongoose.model('logUser',UserSchema)
module.exports = MyUser