import React from "react";
import classes from "./BookingCenter.module.css";
import CustomInput from "./CustomInput";

const FlightBooking = () => {
  return (
    <div className={classes.flight_booking_wrapper}>
      <div className={classes.open_tab}>
        <select>
          <option value="Round trip">Round trip</option>
          <option value="One way">One way</option>
        </select>

        {/* Numbers of passanger */}
        <select>
          <option value="1">1 Passanger</option>
          <option value="2">2 Passangers</option>
          <option value="3">3 Passangers</option>
          <option value="4">4 Passangers</option>
          <option value="5">5 Passangers</option>
          <option value="6">6 Passangers</option>
          <option value="7">7 Passangers</option>
          <option value="8">8 Passangers</option>
        </select>

        <select>
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
            list={"address1"}
            placeholder="Search for a country"
            value={"UNITED STATE"}
          />
          <datalist id="address1">
            <option selected value={"Afganistan"}></option>
          </datalist>
        </CustomInput>

        <CustomInput className={classes.input_text} label={"To where?"}>
          <input
            type={"text"}
            list={"address1"}
            placeholder="Search for a country"
            value={"UNITED STATE"}
          />
          <datalist id="address1">
            <option selected value={"Afganistan"}></option>
          </datalist>
        </CustomInput>

        <div className={classes.date_and_pay_button}>
          <div>
            <CustomInput label={"Leaving on"}>
              <input
                type={"date"}
                value={new Date().toISOString().substr(0, 10)}
                min={new Date().toISOString().substr(0, 10)}
              />
            </CustomInput>
            <CustomInput label={"Returning on"}>
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

export default FlightBooking;
