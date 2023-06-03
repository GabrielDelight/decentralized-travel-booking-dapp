import React, { useState, useEffect } from "react";
import classes from "./BookingCenter.module.css";
import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
import { useCelo } from "@celo/react-celo";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { abiData } from "../../data/abi";
import BigNumber from "bignumber.js";
import ContractHook from "../../Hooks/ContractHook";
import Deposit from "../Deposit/Deposit";

const BookingCenter = () => {
  const { address } = useCelo();

  const [sfFlight, setIsFlight] = useState(true);
  const onToggleBooking = () => setIsFlight(!sfFlight);
  const [showDeposit, setShowDeposit] = useState(false);

  const {
    deposit,
    contractInstance,
    contractBalance,
    depositBalance,
    flightStatus,
    metamaskWallet,
  } = ContractHook();


  const onToggleModal = () => {
    setShowDeposit(!showDeposit)
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
              <h3>Contract Balance: ETH {contractBalance.substr(0, 7)} </h3>
              <h3>My Balance: ETH {depositBalance.substr(0, 7)} </h3>
              <h3>MetaMask Balance: {metamaskWallet.substr(0, 7)}</h3>
              <button onClick={onToggleModal}>Deposit</button>
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
      <Deposit closeModal={onToggleModal} />
      }
    </>
  );
};

export default BookingCenter;
