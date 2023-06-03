import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./Deposit.module.css";

const Deposit = (props) => {
  const [amount, setAmount] = useState("0");

  const { contractInstance, kit, address } = ContractHook();

  const onChnageHandler = (el) => {
    setAmount(el.target.value);
  };

  const onSubmitHandler = () => {
    const confirm = window.confirm(
      `Are you sure you want to deposit ${amount} CELO`
    );

    if (confirm) {
      // Deposit to contractInstance
      contractInstance.methods
        .depositToContract()
        .send({
          from: address,
          value: kit.web3.utils.toWei(amount, "ether"),
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
    }
  };

  // Closing the modal
  const onCloseModal = (el) => {
    if (el.target.id === "parent-modal") {
      props.closeModal();
    }
  };

  return (
    <div className={classes.container} onClick={onCloseModal} id="parent-modal">
      <div className={classes.wrapper}>
        <p>Deposit CELO </p>
        <br></br>
        <div>
          <input
            onChange={onChnageHandler}
            type={"number"}
            placeholder="0.00 CELO"
          />
          <br />
          <br />
          <br />
          <button onClick={onSubmitHandler}>Deposit CELO</button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
