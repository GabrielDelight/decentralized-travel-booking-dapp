import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./Withdraw.module.css";
import Swal from "sweetalert2";
import Loading from "../LoadingIcon/Loading";

const Withdraw = (props) => {
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const { contractInstance, kit, address } = ContractHook();

  const onChangeHandler = (el) => {
    setAmount(el.target.value);
  };

  const onSubmitHandler = () => {
    if (amount.length < 1) return alert("Please input a value");
    const confirm = window.confirm(
      `Are you sure you want to withdraw ${amount} CELO`
    );

    if (confirm) {
      // Withdraw to contractInstance
      setIsLoading(true);

      contractInstance.methods
        .balanceWithdraw(amount)
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
            `You were successful in withdrawing ${amount} CELO from your booking wallet.`,
            "success"
          );
          setIsLoading(false);

          setTimeout(() => {
            props.closeModal();
          }, 3000);
        })

        .on("error", (error) => {
          console.error("Error: occured", error);

          Swal.fire(
            "Transaction failed!",
            `Attempt to withdraw from booking wallet balance failed in the transaction.`,
            "error"
          );
          setIsLoading(false);

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
            onChange={onChangeHandler}
            type={"number"}
            placeholder="1.00 CELO"
          />
          <br />
          <br />
          <br />

          {!isLoading ? (
          <button onClick={onSubmitHandler}>Withdraw CELO</button>
            ) : (
              <Loading />
            )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
