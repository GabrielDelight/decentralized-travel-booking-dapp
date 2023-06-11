import React, { useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./BookingCenter.module.css";
import CustomInput from "./CustomInput";
import Swal from "sweetalert2";
import Loading from "../LoadingIcon/Loading";

const HotelBooking = () => {
  const [formInput, setFormInput] = useState({
    purposeOfTraveling: "Business",
    numberOfGuest: 1,
    numberOfRooms: 1,
    goingTo: "",
    checkIn: new Date().toISOString().substr(0, 10),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .slice(0, 10),
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
    if (depositBalance < 1) {
      return Swal.fire(
        "Insufficient funds!",
        `Insufficient funds please fund your account and try again later.`,
        "error"
      );
    }
    setIsLoading(true);

    contractInstance.methods
      .HotelBookings(
        formInput.goingTo,
        parseInt(formInput.numberOfGuest),
        parseInt(formInput.numberOfRooms),
        formInput.purposeOfTraveling,
        formInput.checkIn,
        formInput.checkOut
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
          `Your hotel booking was successful.`,
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
        <select
          value={formInput.purposeOfTraveling}
          name="purposeOfTraveling"
          onChange={onChangeHandler}
        >
          <option value="Business">
            WHAT ARE YOU TRAVELLING FOR? (Buesiness?){" "}
          </option>
          <option value="Business">Business</option>
          <option value="Liesure">Liesure</option>
        </select>

        {/* Numbers of passanger */}
        <select
          onChange={onChangeHandler}
          value={formInput.guestNumber}
          name="numberOfGuest"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
          <option value="6">6 Guests</option>
          <option value="7">7 Guests</option>
          <option value="8">8 Guests</option>
        </select>

        <select
          onChange={onChangeHandler}
          value={formInput.roomNumber}
          name="numberOfRooms"
        >
          <option value="1">1 Room</option>
          <option value="2">2 Rooms</option>
          <option value="3">3 Rooms</option>
          <option value="4">4 Rooms</option>
          <option value="5">5 Rooms</option>
          <option value="6">6 Rooms</option>
          <option value="7">7 Rooms</option>
          <option value="8">8 Rooms</option>
        </select>
      </div>

      <div className={classes.custom_input_container}>
        <CustomInput className={classes.input_text} label={"Going to?"}>
          <input
            type={"text"}
            list={"address1"}
            value={formInput.goingTo}
            name="goingTo"
            onChange={onChangeHandler}
            placeholder="Destination, city or hotel name"
          />
          <datalist id="address1" onChange={onChangeHandler}>
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
            <option value="CHN">China</option>{" "}
          </datalist>
        </CustomInput>

        <div className={classes.date_and_pay_button}>
          <div>
            <CustomInput label={"Check in"}>
              <input
                type={"date"}
                min={new Date().toISOString().substr(0, 10)}
                onChange={onChangeHandler}
                value={formInput.checkIn}
                name={"checkIn"}
              />
            </CustomInput>
            <CustomInput label={"Check out"}>
              <input
                type={"date"}
                min={new Date().toISOString().substr(0, 10)}
                onChange={onChangeHandler}
                value={formInput.checkOut}
                name={"checkOut"}
              />
            </CustomInput>
          </div>
          <div className={classes.booking_button}>
            {!isLoading ? (
              <button onClick={onPayHandler}>Book now</button>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
      <div className={classes.info_tab}>
          <p>CELO Blockchain </p>{" "}
      </div>
    </div>
  );
};

export default HotelBooking;
