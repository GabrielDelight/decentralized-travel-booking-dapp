import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./Withdraw.module.css";
import Swal from "sweetalert2";

const Withdraw = (props) => {
  const [amount, setAmount] = useState("0");

  const { contractInstance, kit, address } = ContractHook();

  const onChnageHandler = (el) => {
    setAmount(el.target.value);
  };

  const onSubmitHandler = () => {
    if (amount.length < 1) return alert("Please input a value");
    const confirm = window.confirm(
      `Are you sure you want to deposit ${amount} CELO`
    );

    if (confirm) {
      // Withdraw to contractInstance
      contractInstance.methods
        .balanceWithdraw(address, amount)
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
              `You were successful in adding ${amount} CELO to your booking wallet.`,
              "success"
            );
            setTimeout(() => {
              props.closeModal();
            }, 3000)
          })
  
  
  
          .on("error", (error) => {
            console.error("Error: occured", error);
  
            Swal.fire(
              "Transaction failed!",
              `Attempt to withdraw from booking wallet balance failed in the transaction.`,
              "error"
            );
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
        <p>Balance withdraw </p>
        <br></br>
        <div>
          <input
            onChange={onChnageHandler}
            type={"number"}
            placeholder="1.00 CELO"
          />
          <br />
          <br />
          <br />
          <button onClick={onSubmitHandler}>Withdraw CELO</button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
