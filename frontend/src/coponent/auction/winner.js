import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux";
import "./auction.css"
import Countdown from "react-countdown";
const Winner=({endTime})=>{
    const state=useSelector(state=>state.userSlice.value)
    const [winner,setWinner]=useState()
    const {pathname}=useLocation()
    const [show ,setShow]=useState(false)
    const id=pathname.split("/")
    useEffect(()=>{
            fetch(`http://localhost:5000/bid/${id[2]}`).then(data=>{
                return data.json()
             }).then(data=>{
                setWinner([data[data.length-1]])
             })
    },[])
    const [isDisabled, setIsDisabled] = useState(false);
    const countdownEndTime = new Date(endTime).getTime() + 10 * 60 * 1000
  // Renderer for Countdown
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // When the countdown is complete, disable the button
      setIsDisabled(true);
    } else {
      // While counting down, show the time remaining
      return (
        <span>
        {minutes}m {seconds}s
        </span>
      );
    }
  };

    return (
        <>
        <Countdown
        date={countdownEndTime}
        renderer={renderer}
      />
        {winner?<div>
            winner
            <div style={{display:"flex"}}>
            <div className="box" id="winner">
    <div>
        <img src={winner[0].bidder.profilePicture} alt="bidder-profile" height="40px" width="40px" className="winner-img"/>
    </div>
    <div>
        <span style={{margin:"25% 0"}}><b>{winner[0].bidder.fullName}</b></span>
    </div>
    <div style={{display:"flex",flexDirection:"column"}}>
        <span style={{marginTop:"35%"}}><b>Bid Amount :</b></span>
        <span><b>${winner[0].bidAmount}</b></span>
    </div>  
   </div>
   {state.data && state.data[0]._id==winner[0].bidder._id?<button className="buy-button" disabled={isDisabled} onClick={() => {
alert(`You won  ${winner[0].auction.ItemName}`)
    }}>Buy Now</button>:" "}
            </div> 
        </div>:""}
        </>
    )
}
export default Winner