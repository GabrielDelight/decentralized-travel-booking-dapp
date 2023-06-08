import React, { useState } from "react";
import classes from "./HeaderStyles.module.css";
import { useCelo } from "@celo/react-celo";
import BookedData from "../BookedData/BookedData";
const Header = () => {
  const { connect } = useCelo();
  const [isFlight, setIsFlight] = useState(false);
  const [isHotel, setIsHotel] = useState(false);

  const toggleFlightHandler = () => {
    setIsFlight(!isFlight);
  };

  const toggleHotelHandler = () => {
    setIsHotel(!isHotel);
  };

  const onCloseModal = () => {
    setIsHotel(false);
    setIsFlight(false);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <h1>CryptoTraveler</h1>
        </div>

        <div>
          <button onClick={toggleFlightHandler}>Booked Flight</button>
          <button onClick={toggleHotelHandler}>Booked Hotel</button>

          <button className={classes.wallet_connect} onClick={connect}>
            Wallet connect
          </button>
        </div>
      </header>
      {isFlight && (
        <BookedData bookingType={"flight"} onCloseModal={onCloseModal} />
      )}
      {isHotel && (
        <BookedData bookingType={"hotel"} onCloseModal={onCloseModal} />
      )}
    </>
  );
};

export default Header;
