import { useEffect, useState,useRef } from "react"
import "./auction.css"
import {  useNavigate,useLocation,} from "react-router-dom"
import Header from "../header/header"
import { useSelector } from "react-redux"
import axios from "axios"
import Bid from "./action-bid"
import CountDownTimer from "./countdown"
import Winner from "./winner"


const Auction=()=>{
    const navigate=useNavigate()
    const [bidState,setBidState]=useState(false)
    const state=useSelector(state=>state.userSlice.value)
    const [bidItem,setBidItem]=useState([])
    const [boxVisibility,setBoxVisibility]=useState(true)
    const [bidAmount,setBidAmount]=useState("")
    const {pathname}=useLocation()
    const [startBid,setStartBid]=useState()
    const [endBid,setEndBid]=useState()
    const id=pathname.split("/")
    const [showWinner,setShowWinner]=useState(false)
// const endTime=bidItem[0].endTime.replace(/'/g,"")
// const startTime=bidItem[0].startTime.replace(/'/g,"")
    const handleBidding=()=>{
        if(state.token){
            const bidderId=state.data[0]._id
            let bidamount=Number(bidItem[0].startingPrice)+Number(bidAmount)
axios.post("http://localhost:5000/bid",{bidder:bidderId,auction:id[2],bidAmount:bidamount}).then(data=>{
    setBidAmount("")
}).catch(err=>{
    console.log("err",err.message)
})
setBidItem({...bidItem,startingPrice:String(bidamount)})
        }else{
navigate("/signin")
        }
    }
    const BiddingStatus=(start,end)=>{
        setStartBid(start)
        if(end){
            setShowWinner(true)
        }
        setEndBid(end)
    }
    useEffect(()=>{
        fetch(`http://localhost:5000${pathname}`).then(data=>{
          return data.json()
        }).then(data=>{
            setBidItem([data[0]])
            setBidState(!bidState)
        }).catch(err=>{
            console.log(err.response)
        })
    },[bidState,startBid,endBid])
    return (
      <>
      <Header/>
      <div className="bid-container">
   
            <div className="bid-item-image">
{bidItem.length && <img src={bidItem[0].img} alt="bid-item-image"/>}
</div>
<div className="bid-detail-container">
<h2>{ bidItem.length && bidItem[0].ItemName}</h2>
<p>{ bidItem.length && bidItem[0].category}</p>
<hr></hr>
<h4 style={{margin:".54em 0"}}>Saller</h4>
<div className="saller-detail">
   <div>
   <img src={bidItem.length && bidItem[0].saller.profilePicture} alt="saller-image" className="saller-pic"/>
   <div className="seller-name">{ bidItem.length && bidItem[0].saller.fullName}</div>
   </div>
    <button onClick={()=>{setBoxVisibility(!boxVisibility)}} disabled={startBid} className="bid-shower">Bids</button>
    <Bid boxVisibility={boxVisibility} startBid={startBid}/>
</div>
<hr></hr>
<div className="bid-info">
<div>
    Starting Price
    <h4>${ bidItem.length && bidItem[0].startingPrice}</h4>
</div>
<div>
Time :
<div>
{bidItem.length &&<CountDownTimer startTime={bidItem.length && bidItem[0].startTime} endTime={bidItem.length && bidItem[0].endTime} BiddingStatus={BiddingStatus}/>}
</div>
</div>
</div>
<hr></hr>
<div className="bid-footer">
<input type="text" placeholder="Enter your bid" value={bidAmount}onChange={(e)=>{setBidAmount(e.target.value)}}/>
<button onClick={handleBidding} disabled={!startBid}>Place Bid</button>
</div>
{showWinner?<Winner endTime={bidItem[0].endTime} />:""}
</div>

      </div>
      </>
    )
}
export default Auction





// import React, { useEffect, useState, useRef } from "react";
// import "./auction.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import Header from "../header/header";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Bid from "./action-bid";
// import CountDownTimer from "./countdown";
// import Winner from "./winner";

// const Auction = () => {
//   const navigate = useNavigate();
//   const state = useSelector((state) => state.userSlice.value);
//   const { pathname } = useLocation();
// const [bidState,setBidState]=useState(false)
//   const [bidItem, setBidItem] = useState([]);
//   const [bidAmount, setBidAmount] = useState("");
//   const [boxVisibility, setBoxVisibility] = useState(true);
//   const [startBid, setStartBid] = useState(false);
//   const [endBid, setEndBid] = useState(false);
//   const [showWinner, setShowWinner] = useState(false);
//   const id = pathname.split("/")[2];

//   const handleBidding = () => {
//     if (state.token) {
//       const bidderId = state.data[0]._id;
//       const bidAmountTotal = Number(bidItem[0].startingPrice) + Number(bidAmount);
//       setBidState(!bidState)
//       axios
//         .post("http://localhost:5000/bid", {
//           bidder: bidderId,
//           auction: id,
//           bidAmount: bidAmountTotal,
//         })
//         .then(() => {
//           setBidAmount("");
//         })
//         .catch((err) => console.log("Error:", err.message));

//       setBidItem({ ...bidItem, startingPrice: String(bidAmountTotal) });
//     } else {
//       navigate("/signin");
//     }
//   };

//   const BiddingStatus = (started, ended) => {
//     setStartBid(started);
//     setEndBid(ended);
//     setShowWinner(ended);
//   };

//   useEffect(() => {
//     fetch(`http://localhost:5000${pathname}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setBidItem([data[0]]);
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   }, [pathname,bidState]);

//   return (
//     <>
//       <Header />
//       <div className="bid-container">
//         <div className="bid-item-image">
//           {bidItem.length && <img src={bidItem[0].img} alt="bid-item"  className="user-image"/>}
//         </div>
//         <div className="bid-detail-container">
//           <h2>{bidItem.length && bidItem[0].ItemName}</h2>
//           <p>{bidItem.length && bidItem[0].category}</p>
//           <hr />
//           <h4 style={{margin:".54em 0"}}>Seller</h4>
//           <div className="seller-detail">
//             <div>
//               <img src={bidItem.length && bidItem[0].saller.profilePicture} alt="seller" className="saller-picture" height="30px" width="30px"/>
//               <span>{bidItem.length && bidItem[0].saller.fullName}</span>
//             </div>
//             <button onClick={() => setBoxVisibility(!boxVisibility)} disabled={!startBid} id="bids">
//               Bids
//             </button>
//             <Bid boxVisibility={boxVisibility} startBid={startBid} />
//           </div>
//           <hr />
//           <div className="bid-info">
//             <div>
//               Starting Price
//               <h4>${bidItem.length && bidItem[0].startingPrice}</h4>
//             </div>
//             <div>
//               Time:
//               {bidItem.length && (
//                 <CountDownTimer
//                   startTime={bidItem[0].startTime}
//                   endTime={bidItem[0].endTime}
//                   BiddingStatus={BiddingStatus}
//                 />
//               )}
//             </div>
//           </div>
//           <hr />
//           <div className="bid-footer">
//             <input
//               type="text"
//               placeholder="Enter your bid"
//               value={bidAmount}
//               onChange={(e) => setBidAmount(e.target.value)}
//             />
//             <button onClick={handleBidding} disabled={!startBid}>
//               Place Bid
//             </button>
//           </div>
//           {showWinner && <Winner endTime={bidItem[0].endTime} />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Auction;
