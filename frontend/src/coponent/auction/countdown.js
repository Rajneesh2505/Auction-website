import React from "react";
import Countdown from "react-countdown";

const CountDownTimer = ({ startTime, endTime, BiddingStatus }) => {
  const currentTime = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (currentTime < start) {
      // Auction has not started
      return (
        <span>
          Auction starts at {new Date(start).toLocaleString()}
        </span>
      );
    } else if (!completed) {
      // Auction is ongoing
      return (
        <span>
          Time left: {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    } else {
      // Auction has ended
      return <span style={{ color: "red" }}>Auction Ended!</span>;
    }
  };

  React.useEffect(() => {
    const current = new Date().getTime();
    BiddingStatus(current >= start && current < end, current >= end);
  }, [start, end, BiddingStatus]);

  return <Countdown date={end} renderer={renderer} />;
};

export default CountDownTimer;
