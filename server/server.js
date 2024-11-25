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

mongoose.connect("mongodb+srv://rajneeshdadheech2505:Rajneesh@cluster0.dnn9w.mongodb.net/Auction-website?retryWrites=true&w=majority&appName=Cluster0")
// mongoose.connect("mongodb://127.0.0.1:27017/RTB-task ")
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