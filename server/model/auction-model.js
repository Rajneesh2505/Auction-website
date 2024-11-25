const mongoose=require("mongoose")

const auctionSchema=mongoose.Schema({
    ItemName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    startingPrice:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    saller:{ type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  winner: { type:String, default:"" },
  status: {
    type: String,
  }
})

const Auction=mongoose.model("Auction",auctionSchema)
module.exports=Auction