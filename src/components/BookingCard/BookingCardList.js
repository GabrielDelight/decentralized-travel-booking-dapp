import React from "react";
import classes from "./BookingCard.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
const BookingCardList = ({image}) => {
  return (
    <div className={classes.list_item}>
      <div className={classes.background_image}>
        <img src={image} />
      </div>
      <div className={classes.header}>
        <p>France</p>
        <AiOutlineArrowRight />
        <p>Canada</p>
      </div>

      <div className={classes.bottom}>
        <p>Pay now</p>
        <p>2 ether</p>
      </div>

      <div className={classes.pay_button}>
        <button>Pay now</button>
      </div>
    </div>
  );
};

export default BookingCardList;
