import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./BookingCenter.module.css";
import CustomInput from "./CustomInput";
import Swal from "sweetalert2";
import Loading from "../LoadingIcon/Loading";

const FlightBooking = () => {
  const [formInput, setFormInput] = useState({
    fromWhere: "",
    toWhere: "",
    forwardTrip: "",
    numberOfPassangers: 1,
    LeavingOn: new Date().toISOString().substr(0, 10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .slice(0, 10),
    fareType: "Economy",
    itinerary: "One way",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { contractInstance, address, depositBalance } = ContractHook();

  const onPayHandler = () => {
    if (depositBalance < 2) {
      return Swal.fire(
        "Insufficient funds!",
        `Insufficient funds please fund your account and try again later.`,
        "error"
      );
    }

    setIsLoading(true);

    contractInstance.methods
      .FlightBookings(
        formInput.fareType,
        formInput.LeavingOn,
        formInput.returningOn,
        formInput.toWhere,
        formInput.itinerary,
        parseInt(formInput.numberOfPassangers)
      )
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
          "Booking successful!",
          `You were successful in booking a fligt.`,
          "success"
        );
        setIsLoading(false);
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
  };

  return (
    <div className={classes.flight_booking_wrapper}>
      <div className={classes.open_tab}>
        <select name={"itinerary"} onChange={onChangeHandler}>
          <option value="Round trip">Round trip</option>
          <option value="One way">One way</option>
        </select>

        {/* Numbers of passanger */}
        <select name={"numberOfPassangers"} onChange={onChangeHandler}>
          <option value="1">1 Passanger</option>
          <option value="2">2 Passangers</option>
          <option value="3">3 Passangers</option>
          <option value="4">4 Passangers</option>
          <option value="5">5 Passangers</option>
          <option value="6">6 Passangers</option>
          <option value="7">7 Passangers</option>
          <option value="8">8 Passangers</option>
        </select>

        <select name={"fareType"} onChange={onChangeHandler}>
          <option value="economy">Economy</option>
          <option value="premium-economy">Premium Economy </option>
          <option value="buesiness">Buesiness</option>
          <option value="first-class">First class</option>
        </select>
      </div>

      <div className={classes.custom_input_container}>
        <CustomInput className={classes.input_text} label={"From where?"}>
          <input
            type={"text"}
            name={"fromWhere"}
            onChange={onChangeHandler}
            list={"address1"}
            placeholder="Search for a country"
            value={formInput.fromWhere}
          />
          <datalist id="address1">
            <option value="USA">United States of America</option>
            <option value="CAN">Canada</option>
            <option value="GBR">United Kingdom</option>
            <option value="GER">Germany</option>
            <option defaultValue value="FRA">
              France
            </option>
            <option value="JPN">Japan</option>
            <option value="AUS">Australia</option>
            <option value="BRA">Brazil</option>
            <option value="IND">India</option>
            <option value="CHN">China</option>
          </datalist>
        </CustomInput>

        <CustomInput className={classes.input_text} label={"To where?"}>
          <input
            type={"text"}
            name={"toWhere"}
            onChange={onChangeHandler}
            list={"address1"}
            placeholder="Search for a country"
            value={formInput.toWhere}
          />
          <datalist id="address1">
            <option defaultValue value={"Afganistan"}></option>
          </datalist>
        </CustomInput>

        <div className={classes.date_and_pay_button}>
          <div>
            <CustomInput label={"Leaving on"}>
              <input
                type={"date"}
                name={"LeavingOn"}
                onChange={onChangeHandler}
                value={formInput.LeavingOn}
                min={new Date().toISOString().substr(0, 10)}
              />
            </CustomInput>
            <CustomInput label={"Returning on"}>
              <input
                type={"date"}
                name={"returningOn"}
                onChange={onChangeHandler}
                value={formInput.returningOn}
                min={new Date().toISOString().substr(0, 10)}
              />
            </CustomInput>
          </div>
          <div className={classes.booking_button}>
            {!isLoading ? (
              <button onClick={onPayHandler}>Book now</button>
            ) : (
              <Loading />
            )}{" "}
          </div>
        </div>
      </div>
      <div className={classes.info_tab}>
        <p>CELO Blockchain </p>{" "}
      </div>
    </div>
  );
};

export default FlightBooking;
