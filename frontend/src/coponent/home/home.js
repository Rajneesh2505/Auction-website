import AuctionImage from "../assets/heroimg.png"
import { useNavigate,Link } from "react-router-dom"
import "./home.css"
import AuctionCard from "../auction-cards/auction-card-"
import Header from "../header/header"
import { useSelector } from "react-redux"
import { useState } from "react"
const Home=()=>{
    const navigate=useNavigate()
    const state=useSelector(state=>state.userSlice.value)
return(
    <>
    <body>
        <Header/>
        <main>
            <section className="banner-section">
<div className="text-container">
<h4>DISCOVER, COLLECT AND SELL</h4>
<h2>Discover Rare Products And Bid in Real-Time</h2>
<p>Our real-time auctions let you join the thrill of selling, hunting and bidding live on rare Products. Explore our listings to start bidding or sell your own products!</p>
</div>
<div className="img-container">
<img src={AuctionImage}alt="auction-image" height="350px" width="600px"/>
</div>
            </section>
            <section className="auction-banner">
            <Link to={state&&state.token?"/add-item":"/signin"} style={{color:"white",textDecoration:"none"}}><h2><span>+</span> Create Auction</h2></Link>
            <AuctionCard/>
            </section>
        </main>
        <footer>
            
        </footer>
    </body>
    </>
)
}
export default Home