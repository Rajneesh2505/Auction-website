const express=require("express")
const app=express()
const mongoose=require("mongoose")
const http=require("http")
const {Server} =require("socket.io")
const userController=require("./route/user-route")
const auctionController=require("./route/auction-route")
const bidController=require("./route/bid-route")
const cors=require("cors")


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:"http://localhost:3000",credentials:true}))
const server=http.createServer(app)

// mongoose.connect("mongodb+srv://Rajneesh:Rajneesh@auction-website.ijbk0.mongodb.net/Bidding-auction-website?retryWrites=true&w=majority&appName=Auction-website")
// mongoose.connect("mongodb+srv://snehasen18:snehasen18@auction1.kwvfvd1.mongodb.net/Bidding-Auction?retryWrites=true&w=majority&appName=Auction1")
// mongoose.connect("mongodb://localhost:27017/Bidding-Auction-Website");/
mongoose.connect("mongodb://127.0.0.1:27017/Bidding-auction")
const io=new Server(server,{
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"]
    }
  })

io.on("connection",socket=>{
socket.on("message",message=>{
   io.emit("server-message",message)
})
})
server.listen(5000,()=>{
    console.log("app start")
})

///controller
app.use("/",userController)
app.use("/",auctionController)
app.use("/",bidController)
