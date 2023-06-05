import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./BookingCenter.module.css";
import CustomInput from "./CustomInput";
import Swal from "sweetalert2";

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

  const onChangeHandler = (e) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { contractInstance, address, depositBalance, contractBalance } = ContractHook();

  const onPayHandler = () => {

    if(depositBalance > 2)
    console.log(formInput);

    console.log(formInput)

    let fareTypes = formInput.fareType;
    let LeavingOn = formInput.LeavingOn;
    let returningOn = formInput.returningOn;
    let toWhere = formInput.toWhere;
    let itinerary = formInput.itinerary;
    let numberOfPassanger = parseInt(formInput.numberOfPassangers);

    contractInstance.methods
      .FlightBookings(
        fareTypes,
        LeavingOn,
        returningOn,
        toWhere,
        itinerary,
        numberOfPassanger
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
            <option defaultValue value={"Afganistan"}></option>
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
            <button onClick={onPayHandler}>Book now</button>
          </div>
        </div>
      </div>
      <div className={classes.info_tab}>
        <p>Payments are in etheruem</p>
      </div>
    </div>
  );
};

export default FlightBooking;
