import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./Deposit.module.css";
import Swal from "sweetalert2";
import Loading from "../LoadingIcon/Loading";

const Deposit = (props) => {
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);

      contractInstance.methods
        .deposit()
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
          Swal.fire(
            "Deposit successful!",
            `You were successful in adding ${amount} CELO to your booking wallet.`,
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
            `Attempt to deposit to the booking wallet failed in the transaction.`,
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
        <p>Deposit CELO </p>
        <br></br>
        <div>
          <input
            onChange={onChnageHandler}
            type={"number"}
            placeholder="1 CELO"
          />
          <br />
          <br />
          <br />
          {!isLoading ? (
              <button onClick={onSubmitHandler}>Deposit CELO</button>
            ) : (
              <Loading />
            )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
