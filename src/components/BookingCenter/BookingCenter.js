import React, { useState, useEffect } from "react";
import classes from "./BookingCenter.module.css";
import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
import { useCelo } from "@celo/react-celo";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { abiData } from "../../data/abi";
import BigNumber from "bignumber.js";
import { bytecode } from "../../data/byteCode";

const BookingCenter = () => {
  const { address } = useCelo();

  const [sfFlight, setIsFlight] = useState(true);
  const onToggleBooking = () => setIsFlight(!sfFlight);

  const [walletBalnce, setWalletBalance] = useState();
  const [walletBalance, wetWalletbalance] = useState();
  const [metamaskWallet, setMetamaskWallet] = useState();

  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  const kit = newKitFromWeb3(web3);

  kit.addAccount(
    "ec4aa7efc0f434dc888bbafd1655d0837afa73d706b5e9ae6e266bdf2b9ce9e5"
  );

  // Contract Instance
  // const contract = new kit.web3.eth.Contract(
  //   abiData,
  //   "0x6f6eeFD3926b32da0f1961EbabcDb85686Bf44a5"
  // );

  console.log("====>>", address)

  let contract = new web3.eth.Contract(abiData, "0x6f6eeFD3926b32da0f1961EbabcDb85686Bf44a5");
  // ,  {from: address, gas: 47000, gasPrice: 47000, bytecode}
  
  // const contract = new kit.web3.eth.Contract(
  //   abiData,
  //   "0x6f6eeFD3926b32da0f1961EbabcDb85686Bf44a5"
  // );


  useEffect(() => {
    async function isConnectedToContract() {
      try {
        // const result = await contract.methods.test().call();
        // console.log("Result:", result);

        // let accounts = await kit.web3.eth.getAccounts();
        // setAccount(accounts[0]);

        console.log("Gas Price:", await kit.web3.eth.getGasPrice());

        // const balance = await contract.methods.COntractBala
        // Todo
        // 1. Get Flight status
        // contract.methods.
        // 2. Get user Balance
        // console.log("Address=?",address)

        // Get metamask balance
        let balance = await kit.web3.eth.getBalance(address);
        console.log("ddd", balance)
        setMetamaskWallet(new BigNumber(balance).dividedBy(1e18).toString());


         const contractBalance = await contract.methods.contractBalance().call();
        console.log("contractBalance:", contractBalance);
      } catch (error) {
        console.log(error);
      }
    }
    isConnectedToContract();
  }, []);

  // Deposit to contract
  const deposit = async () => {
    //     const accountsM = await window.ethereum.request({
    //       method: "eth_requestAccounts",
    //   });
    //   console.log(accountsM)

    // return
    contract.methods
      .deposit()
      .send({
        from: address,
        value: kit.web3.utils.toWei("1", "ether"),
        // gasPrice: 2000000,
        gas: 3000000,
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Receipt:", receipt);
      })
      
      .on("error", (error) => {
        console.error("Error: occured", error);
      });
  };


  console.log("metamaskWallet", metamaskWallet)
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
          <div>
            <h1>Balance: ETH 0.0001 </h1>
            <p>CELO Balance: ${metamaskWallet}</p>
            <button onClick={deposit}>Deposit</button>
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
  );
};

export default BookingCenter;
