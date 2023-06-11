import React, { useState, useEffect } from "react";
import { useCelo } from "@celo/react-celo";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { abiData } from "../data/abi";
import BigNumber from "bignumber.js";
import Swal from "sweetalert2";

const ContractHook = () => {
  const { address } = useCelo();
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
    "0x0731B5fe80649E337e8B8b520a0F636fC8C248c8"
  );

  useEffect(() => {
    async function isConnectedToContract() {
      try {
        const result = await contractInstance.methods.test().call();

        // 1. Get Flight status
        const flightStatusVar = await contractInstance.methods
          .flightStatus()
          .call();
        setFlightStatus(flightStatusVar);

        // Get metamask balance
        let balance = await kit.web3.eth.getBalance(address);
        setMetamaskWallet(new BigNumber(balance).dividedBy(1e18).toString());

        const contractBalance = await contractInstance.methods
          .contractBalance()
          .call();
        setContractBalance(
          new BigNumber(contractBalance).dividedBy(1e18).toString()
        );

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

  const onWithdrawAllFunction = () => {
    contractInstance.methods
      .withdrawAllFunds()
      .send({
        from: address,
        gas: 3000000,
      })

      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Receipt:", receipt);
        Swal.fire(
          "Withdrawal successful!",
          `You have successfully transferred all funds from the contract wallet to your booking address.        .`,
          "success"
        );
      })

      .on("error", (error) => {
        console.error("Error: occured", error);

        Swal.fire(
          "Transaction failed!",
          `Attempt to withdraw from booking wallet balance failed in the transaction.`,
          "error"
        );
      });
  };

  return {
    contractInstance,
    metamaskWallet,
    flightStatus,
    contractBalance,
    depositBalance,
    kit,
    address,
    onWithdrawAllFunction,
  };
};

export default ContractHook;
