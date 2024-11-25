const express=require("express")
const route=express.Router()
const Users=require("../model/user-model")
const Auction=require("../model/auction-model")
route.post("/auction",async(reqs,resp)=>{
await Auction.create({ItemName:reqs.body.ItemName,
category:reqs.body.category,
startTime:reqs.body.startTime,
endTime:reqs.body.endTime,
img:reqs.body.img,
startingPrice:reqs.body.startingPrice,
description:reqs.body.description,
saller:reqs.body._id}).then(data=>{
    resp.status(200).send("auction data added")
}).catch(err=>{
   resp.status(400).send(err)
})
})

route.get("/auction",(reqs,resp)=>{
    Auction.find().populate("saller").then(data=>{
        resp.status(200).send(data)
    })
})

route.get("/auction/:id",(reqs,resp)=>{
    Auction.find({_id:reqs.params.id}).populate("saller").then(data=>{
        resp.status(200).send(data)
    }).catch(err=>{
        resp.status(400).send(err.message)
    })
})

route.get("/:id",(reqs,resp)=>{
    Auction.find({_id:reqs.params.id}).populate("saller","auction").then(data=>{
        resp.status(200).send(data)
    }).catch(err=>{
        resp.status(400).send(err.message)
    })
})

module.exports=route