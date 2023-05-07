import React from "react";
import classes from "./BookingCenter.module.css";

const CustomInput = (props) => {
  return (
      <div className={classes.custom_input + " " + props.className}>
        <p>{props.label}</p>
        <div>{props.children}</div>
    </div>
  );
};

export default CustomInput;
