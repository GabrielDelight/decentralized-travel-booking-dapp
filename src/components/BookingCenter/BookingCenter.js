import React, { useState, useEffect } from "react";
import classes from "./BookingCenter.module.css";
import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
import { useCelo } from "@celo/react-celo";
import ContractHook from "../../Hooks/ContractHook";
import Deposit from "../Deposit/Deposit";
import Withdraw from "../Withdraw/Withdraw";

const BookingCenter = () => {
  const [sfFlight, setIsFlight] = useState(true);
  const onToggleBooking = () => setIsFlight(!sfFlight);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const {
    contractBalance,
    depositBalance,
    metamaskWallet,
    onWithdrawAllFunction
  } = ContractHook();


  const onToggleDeposit = () => {
    setShowDeposit(!showDeposit)
  }

  const onToggleWithdraw = () => {
    setShowWithdraw(!showWithdraw)
  }
  return (
    <>
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
            <div>
              <h3>Contract Balance:  {contractBalance.substr(0, 7)} CELO</h3>
              <h3>My Balance:  {depositBalance.substr(0, 7)} CELO</h3>
              <h3>MetaMask Balance: {metamaskWallet.substr(0, 7)} CELO</h3>
              <button className={classes.deposit_button} onClick={onToggleDeposit}>Deposit</button>
              <button className={classes.withdrawal_button} onClick={onToggleWithdraw} >Balance withdraw</button>
              <div>
              <button className={classes.withdrawal_button} onClick={onWithdrawAllFunction} >Withdraw from contract (admin only)</button>
              </div>
            </div>
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
      {showDeposit && 
      <Deposit closeModal={onToggleDeposit} />
      }
      {showWithdraw && <Withdraw closeModal={onToggleWithdraw} />}
    </>
  );
};

export default BookingCenter;
