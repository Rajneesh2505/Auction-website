import { useEffect, useState } from "react"
import UserImage from "../assets/user-img.png"
import { useNavigate } from "react-router-dom"
import "./auction-card.css"
import Header from "../header/header"
const AuctionCard=()=>{
    const [cardData,setCardData]=useState([])
    const navigate=useNavigate()
    const months={"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}
    useEffect(()=>{
fetch("http://localhost:5000/auction").then(data=>{
    return data.json()
}).then(data=>{
    setCardData([...data])
})
    },[])
return (
    <>
    <div className="card-parent">
    
{ cardData.map(carddata=>{
    return (
    <>
    <div className="card-container">
        <div className="auction-timer">
    <img src={carddata.img} alt="card-image" className="card-img" height="100%" width="100%"/>
    <p>Auction start at {carddata.startTime.slice(0,10).split("-").reverse().join("/")},{carddata.startTime.slice(11)}</p>
</div>
<h4>{carddata.ItemName}</h4>
<div className="user-detail">
    <img src={carddata.saller.profilePicture} alt="user-image" height="40px" width="40px" />
    <p>{carddata.saller.fullName}</p>
</div>
<hr style={{opacity:".1"}}></hr>
<div className="card-footer">
    <div>
    Current Bid
    <h5>${carddata.startingPrice}</h5>
    </div>
    <button onClick={()=>{navigate(`/auction/${carddata._id}`)}}>$ Place Bid</button>
</div>
</div>
</>
    )
})}
    </div>
    


    </>
)
}
export default AuctionCard