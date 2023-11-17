import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar/Navbar";
import Card from "../components/ui/Card";
import LoadingContext from "../context/LoadingContext/LoadingContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const MyBookingsPage = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [bookingData, setBookingData] = useState([]);

  const getBookingData = useCallback(async () => {
    const res = await axios.get("http://localhost:90/bookings/get", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data.bookingData;
  }, []);

  useEffect(() => {
    const setData = async () => {
      setIsLoading(true);
      const data = await getBookingData();
      setBookingData(data);
      setIsLoading(false);
    };

    setData();
  }, [setIsLoading, getBookingData]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Navbar />
      <section className="container overflow-hidden">
        <h3 className={"booking-heading"}>
          {`${localStorage.getItem("userFullName")}'s Bookings`}
        </h3>
        {bookingData.length === 0 ? (
          <p className="warning-msg">No any booking data.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gx-3 gy-5">
            {bookingData.map((item) => {
              return (
                <div
                  className="col p-4 justify-self-stretch align-self-stretch"
                  key={item._id}
                >
                  <Card className={`${"booking-container"} grid grid--2-cols`}>
                    <img
                      src={item.spotData[0].imageURL}
                      alt="Night Sky"
                      className={`${"booking-img"}`}
                    />
                    <div className={"booking-contents"}>
                      <h4 className={"spot-name"}>
                        Spot Name: {item.spotData[0].name}
                      </h4>
                      <p className={"booking-date"}>
                        Booking Date:{" "}
                        {new Date(item.date).toLocaleDateString("en-US", {
                          dateStyle: "full",
                        })}
                      </p>
                      <p className={"booking-id"}>Booking ID: {item._id}</p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default MyBookingsPage;
