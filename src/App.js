import React from "react";
import BookingCard from "./components/BookingCard/BookingCard";
import BookingCenter from "./components/BookingCenter/BookingCenter";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { FlightBookingData } from "./data/FlightBookingData";
import { HotelBookingData } from "./data/HotelBookingData";

function App() {
  return (
    <div className="">
      <Header />
      <BookingCenter />
      <br />
      <BookingCard
        title={"Best Flight Reservations"}
        data={FlightBookingData}
      />
      <BookingCard title={"Top Hotel Reservations"} data={HotelBookingData} />
      <Footer />
    </div>
  );
}

export default App;
