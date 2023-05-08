import React from "react";
import classes from "./BookingCenter.module.css";
import CustomInput from "./CustomInput";

const HotelBooking = () => {
  return (
    <div className={classes.flight_booking_wrapper}>
      <div className={classes.open_tab}>
        <select>
          <option>WHAT ARE YOU TRAVELLING FOR?</option>
          <option value="Round trip">Business</option>
          <option value="One way">Liesure</option>
        </select>

        {/* Numbers of passanger */}
        <select>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
          <option value="6">6 Guests</option>
          <option value="7">7 Guests</option>
          <option value="8">8 Guests</option>
        </select>


        <select>
          <option value="1">1 Room</option>
          <option value="2">2 Rooms</option>
          <option value="3">3 Rooms</option>
          <option value="4">4 Rooms</option>
          <option value="5">5 Rooms</option>
          <option value="6">6 Rooms</option>
          <option value="7">7 Rooms</option>
          <option value="8">8 Rooms</option>
        </select>



        {/* <select>
          <option value="economy">Economy</option>
          <option value="premium-economy">Premium Economy </option>
          <option value="buesiness">Business</option>
          <option value="first-class">First class</option>
        </select> */}
      </div>

      <div className={classes.custom_input_container}>
        <CustomInput className={classes.input_text} label={"Going to?"}>
          <input
            type={"text"}
            list={"address1"}
            placeholder="Destination, city or hotel name"
            value={"UNITED STATE"}
          />
          <datalist id="address1">
            <option selected value={"Afganistan"}></option>
          </datalist>
        </CustomInput>

 

        <div className={classes.date_and_pay_button}>
          <div>
            <CustomInput label={"Check in"}>
              <input
                type={"date"}
                value={new Date().toISOString().substr(0, 10)}
                min={new Date().toISOString().substr(0, 10)}
              />
            </CustomInput>
            <CustomInput label={"Check out"}>
              <input
                type={"date"}
                value={new Date().toISOString().substr(0, 10)}
                min={new Date().toISOString().substr(0, 10)}
              />
            </CustomInput>
          </div>
          <div className={classes.booking_button}>
            <button>Book now</button>
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
