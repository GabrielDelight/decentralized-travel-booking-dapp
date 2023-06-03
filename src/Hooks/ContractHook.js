import React, { useState, useEffect } from "react";
import { useCelo } from "@celo/react-celo";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { abiData } from "../data/abi";
import BigNumber from "bignumber.js";

const ContractHook = () => {
  const { address } = useCelo();

  const [sfFlight, setIsFlight] = useState(true);
  const onToggleBooking = () => setIsFlight(!sfFlight);

  const [depositBalance, setDepositBalance] = useState("");
  const [contractBalance, setContractBalance] = useState("");
  const [flightStatus, setFlightStatus] = useState("");
  const [metamaskWallet, setMetamaskWallet] = useState("");

  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  const kit = newKitFromWeb3(web3);

  kit.addAccount(
    "ec4aa7efc0f434dc888bbafd1655d0837afa73d706b5e9ae6e266bdf2b9ce9e5"
  );

  let contractInstance = new kit.web3.eth.Contract(
    abiData,
    "0x9817dd6F04cAf51e7e2E84f95d50a5b8682EB75d"
  );

  useEffect(() => {
    async function isConnectedToContract() {
      try {
        const result = await contractInstance.methods.test().call();
        // console.log("Result:", result);

        // 1. Get Flight status
        const flightStatusVar = await contractInstance.methods
          .flightStatus()
          .call();
        setFlightStatus(flightStatusVar);
        // contractInstance.methods.

        // Get metamask balance
        let balance = await kit.web3.eth.getBalance(address);
        setMetamaskWallet(new BigNumber(balance).dividedBy(1e18).toString());

        const contractBalance = await contractInstance.methods
          .contractBalance()
          .call();
        setContractBalance(
          new BigNumber(contractBalance).dividedBy(1e18).toString()
        );
        // console.log("contractInstance Balance:", contractBalance);

        // Get deposit amount
        const depositBalance = await contractInstance.methods
          .balanceAddress(address)
          .call();
        setDepositBalance(
          new BigNumber(depositBalance).dividedBy(1e18).toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
    isConnectedToContract();

    let intervalId = setInterval(() => {
      isConnectedToContract();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    contractInstance,
    metamaskWallet,
    flightStatus,
    contractBalance,
    depositBalance,
    kit,
    address,
  };
};

export default ContractHook;
