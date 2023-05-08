import React from "react";
import classes from "./BookingCard.module.css";
import BookingCardList from "./BookingCardList";
const BookingCard = (props) => {
  return (
    <section className={classes.section}>
      <h1 className={classes.title}>{props.title}</h1>
      <div className={classes.card_section}>
        {props.data.map((cur, index) => (
          <BookingCardList image={cur.image} key={index} />
        ))}
      </div>
    </section>
  );
};

export default BookingCard;
