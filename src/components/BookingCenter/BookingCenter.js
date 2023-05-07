import React, { useState } from "react";
import classes from "./BookingCenter.module.css";
import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
const BookingCenter = () => {
  const [sfFlight, setIsFlight] = useState(true);
  const onToggleBooking = () => setIsFlight(!sfFlight);
  return (
    <section
      className={
        sfFlight
          ? classes.section + " " + classes.flight_backGround
          : classes.section + " " + classes.hotelt_backGround
      }
    >
      <div className={classes.wrapper}>
        <div className={classes.top_head}>
          <h1>Decentralized Travel Booking DAPP</h1>
        </div>
        <br />

        <div className={classes.booking_data}>
          <div className={classes.booking_tab}>
            <button
              onClick={onToggleBooking}
              style={{ backgroundColor: sfFlight ? "cornflowerblue" : "" }}
            >
              Book Flight
            </button>
            <button
              onClick={onToggleBooking}
              style={{ backgroundColor: !sfFlight ? "cornflowerblue" : "" }}
            >
              Find Hotel
            </button>
          </div>
          {sfFlight && <FlightBooking />}
          {!sfFlight && <HotelBooking />}
        </div>
      </div>
    </section>
  );
};

export default BookingCenter;
