const express=require("express")
const route=express.Router()
const Users=require("../model/user-model")
const hashPassword=require("../utility/utility")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")

const token=crypto.randomBytes(64).toString("hex")

route.post("/signup",async(reqs,resp)=>{
    await hashPassword(reqs.body.password).then(password=>{
        Users.create({...reqs.body,password:password}).then(data=>{
            if(data._id){
                resp.status(200).send("user created successfully")
            }
        }).catch(err=>{
            resp.status(400).send(err.message)
        })
    })

})

route.post("/signin",(reqs,resp)=>{
    Users.find({email:reqs.body.email}).then(data=>{
    if(data.length){
        bcrypt.compare(reqs.body.password,data[0].password).then(bool=>{
            if(bool){
                let Token=jwt.sign(token,reqs.body.email)
                resp.status(200).send({token:Token,data})
            }else{
                resp.status(400).send("enter a valid password")
            }
        })
    }else{
        resp.status(400).send("please enter valid email")
    }
    })
})


module.exports=route