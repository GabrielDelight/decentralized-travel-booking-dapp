import React, { useState } from "react";
import classes from "./BookingCenter.module.css";
import CustomInput from "./CustomInput";


const HotelBooking = () => {

  const [formInput, setFormInput] = useState({
    purposeOfTraveling: "",
    guestNumber: 0,
    roomNumber: 0,
    goingTo: "",
    checkIn: new Date().toISOString().substr(0, 10),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .slice(0, 10),
  });

  const onChangeHandler = (e) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onPayHandler = () => {
    console.log("====>", formInput);
  };

  return (
    <div className={classes.flight_booking_wrapper}>
      <div className={classes.open_tab}>
        <select
          value={formInput.purposeOfTraveling}
          name="purposeOfTraveling"
          onChange={onChangeHandler}
        >
          <option>WHAT ARE YOU TRAVELLING FOR?</option>
          <option value="Business">Business</option>
          <option value="Liesure">Liesure</option>
        </select>

        {/* Numbers of passanger */}
        <select
          onChange={onChangeHandler}
          value={formInput.guestNumber}
          name="guestNumber"
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
          name="roomNumber"
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
            <option defaultValue value={"Afganistan"}></option>
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

export default HotelBooking;
