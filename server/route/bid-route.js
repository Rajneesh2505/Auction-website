const express=require("express")
const route=express.Router()
const Bid=require("../model/bid-model")
const Auction=require("../model/auction-model")
route.post("/bid",(reqs,resp)=>{
    
Bid.create({
    bidder:reqs.body.bidder,
    auction:reqs.body.auction,
    bidAmount:reqs.body.bidAmount,  
}).then(data=>{
  Auction.updateOne({_id:reqs.body.auction},{ 
    $push:{bids:data._id},
    $set:{startingPrice:String(reqs.body.bidAmount)}
  }).then(data=>{
      resp.status(200).send("accepted")  
  })
}).catch(err=>{
    resp.status(400).send(err.message)
})
})

route.post("/iswin",(reqs,resp)=>{
    Bid.findOneAndUpdate({_id:reqs.body._id},{$addField:{isWinningBid:true}}).then(data=>{
       Auction.updateOne({_id:reqs.body.auction},{$set:{winner:reqs.body.bidder.fullName}}).then(data=>{
        resp.status(200).send(data)
       }).catch(err=>{
        resp.status(400).send(err.message)
       })
    }).catch(err=>{
        resp.status(400).send(err.message)
    })
})


route.get("/bid/:id",(reqs,resp)=>{
Bid.find({auction:reqs.params.id}).populate("bidder").populate("auction").then(data=>{
    resp.status(200).send(data)
}).catch(err=>{
    resp.status(400).send(err.message)
})
})
// route.get("/:id",(reqs,resp)=>{
//     Bid.find({_id:reqs.body.id}).then(data=>{
//         // resp.send(data)
//         console.log("===>",data)
//     })
//     })

module.exports=route