import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const CountDownTimer = (props) => {
  const currentTime = new Date().getTime();
  const startTime = new Date(props.startTime).getTime();
  const endTime = new Date(props.endTime).getTime();
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);
  useEffect(() => {
    props.BiddingStatus(auctionStarted,auctionEnded)
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (
        !auctionStarted &&
        currentTime >= startTime &&
        currentTime < endTime
      ) {
        console.log("auction start")
        setAuctionStarted(true);
      }
      if (auctionStarted && currentTime >= endTime && !auctionEnded) {
        console.log("auction end")
        setAuctionEnded(true)
        setAuctionStarted(false)
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [auctionStarted, auctionEnded, startTime, endTime]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <span className="text-red-400 animate-fadeinout" style={{color:"red"}}>Auction Ended!</span>
      );
    } else if (currentTime < startTime) {
      // Render a countdown to start time
      return (
        <span>
          Auction start at
          {" " + new Date(startTime).toLocaleString()}
        </span>
      );
    } else {
      // Render a countdown to end time
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div>
      <Countdown date={endTime} renderer={renderer} />
    </div>
  );
};

export default CountDownTimer;

