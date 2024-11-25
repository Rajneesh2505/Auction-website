const mongoose=require("mongoose");

const bidSchema = new mongoose.Schema({
  bidder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users", required: 
    true },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
  isWinningBid: { type: Boolean, default: false },
},
{
  timestamps: true,
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports= Bid;
