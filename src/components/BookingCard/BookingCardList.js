import React from "react";
import classes from "./BookingCard.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsDash } from "react-icons/bs";
const BookingCardList = (props) => {
  return (
    <div className={classes.list_item}>
      <div className={classes.background_image}>
        <img src={props.item.image} />
      </div>
      <div className={classes.header}>
        <div>
          <p>{props.item.fromWhere}</p>
          <AiOutlineArrowRight />
          <p>{props.item.toWhere}</p>
          {props.item.type === "hotel" && <p>{props.item.goingTo}</p>}
        </div>

        {props.item.type === "hotel" ? (
          <>
            <div>
              <p>{props.item.checkIn}</p>
              <BsDash />
              <p>{props.item.checkOut}</p>
            </div>

            <div>
              <p>Purpose:</p>
              <p>{props.item.purposeOfTraveling}</p>
            </div>

            <div>
              <p>Room:</p>
              <p>
                {props.item.room} | Guest {props.item.guest}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>{props.item.LeavingOn}</p>
              <BsDash />
              <p>{props.item.returningOn}</p>
            </div>

            <div>
              <p>Passanger: </p>              
              <p>{props.item.passanger} | {props.item.flightType}</p>
            </div>



          </>
        )}
      </div>

      <div className={classes.bottom}>
        <p>Pay now</p>
        <p>{props.item.price} ether</p>
      </div>

      <div className={classes.pay_button}>
        <button>Pay now</button>
      </div>
    </div>
  );
};

export default BookingCardList;
