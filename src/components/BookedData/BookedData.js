import React, { useEffect, useState } from "react";
import ContractHook from "../../Hooks/ContractHook";
import classes from "./BookedData.module.css";
const BookedData = (props) => {
  const [flightBookingData, setFlightBookingData] = useState({})
  const onHandleClick = (el) => {
    if (el.target.id === "parent-div") {
      props.onCloseModal();
    }
  };

  const { contractInstance, address } = ContractHook();
  useEffect(() => {

    // get Flight Booking Data
    contractInstance.methods
      .flightBookingAddresses(address)
      .call()
      .then((data) => {
        console.log(data);
        setFlightBookingData(data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className={classes.container} onClick={onHandleClick} id="parent-div">
      <div className={classes.wrapper}>
        {props.bookingType === "flight" && (
          <>
            <h1>Flight Data</h1>
            <br />
            <table>
              <tr>
                <td>Owner address: </td>
                <td className={classes.bread_word}>{flightBookingData.bookingOwnerAddress} </td>
              </tr>
              <tr>
                <td>Amount:</td>
                <td> {flightBookingData.paymentAmount} </td>
              </tr>
              <tr>
                <td>Flight Number: </td>
                <td>{flightBookingData.flightNumber} </td>
              </tr>
              <tr>
                <td>Flight Status: </td>
                <td>{flightBookingData.flightStatus} </td>
              </tr>
              <tr>
                <td>Seat number:  </td>
                <td>{flightBookingData.seatNumber}</td>
              </tr>
              <tr>
                <td>Fare type:  </td>
                <td>{flightBookingData.fareTypes}</td>
              </tr>
              <tr>
                <td>Leaving on:  </td>
                <td>{flightBookingData.LeavingOn}</td>
              </tr>
              <tr>
                <td>Returning on:  </td>

                <td>{flightBookingData.returningOn}</td>
              </tr>
              <tr>
                <td>To where:  </td>
                <td>{flightBookingData.toWhere}</td>
              </tr>
              <tr>
                <td>Itinerary:  </td>
                <td>{flightBookingData.itinerary}</td>
              </tr>
              <tr>
                <td>Number of passangers:  </td>
                <td>{flightBookingData.numberOfPassangers}</td>
              </tr>
            </table>
          </>
        )}

        {props.bookingType === "hotel" && (
          <>
            <h1>Hotel Data</h1>
            <table>
              <tr>
                <td>bookingOwnerAddress: </td>
              </tr>
              <tr>
                <td>bookingNumber: </td>
              </tr>
              <tr>
                <td>checkIn: </td>
              </tr>
              <tr>
                <td>checkOut: </td>
              </tr>
              <tr>
                <td>numberOfGuest: </td>
              </tr>
              <tr>
                <td>numberOfRooms: </td>
              </tr>
              <tr>
                <td>purposeOfTraveling: </td>
              </tr>
              <tr>
                <td>paymentAmount: </td>
              </tr>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default BookedData;
