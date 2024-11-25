const mongoose=require("mongoose")

const userModel=mongoose.Schema({
    fullName: { type: String, required: true, trim : true},
  password: { type: String, required: true,trim : true},
  email: { type: String, required: true, unique: true , trim : true},
  profilePicture: { type: String , 
    default:"https://res.cloudinary.com/dnsxaor2k/image/upload/v1721403078/r4s3ingo0ysqq5hzsqal.jpg"},
    phone: { type: String,minLength:"10",maxLength:"10" },
    city: { type: String },
    gender: { type: String }
})

const user=mongoose.model("Users",userModel)
module.exports=user;