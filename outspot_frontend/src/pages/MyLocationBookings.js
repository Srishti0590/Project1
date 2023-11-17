import React, { useState, useEffect, useCallback } from "react";

import Navbar from "../components/ui/Navbar/Navbar";
import Footer from "../components/ui/Footer";
import axios from "axios";

const MyLocationBookingsPage = () => {
  const [locationBookingData, setLocationBookingData] = useState([]);

  const getLocationBookingData = useCallback(async () => {
    const res = await axios.get("http://localhost:90/bookings/get/spot", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.data.data;
  }, []);

  useEffect(() => {
    const setData = async () => {
      const data = await getLocationBookingData();
      setLocationBookingData(data);
    };

    setData();
  }, [getLocationBookingData]);

  return (
    <React.Fragment>
      <Navbar />
      <section className="container overflow-hidden">
        <h3 className={"booking-heading"}>
          {`${localStorage.getItem("userFullName")}'s Location Bookings`}
        </h3>
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gx-3 gy-5">
          {locationBookingData.map((data) => {
            return (
              <div key={data.data[0]._id}>
                <h4 className={"spot-name"}>
                  {data.spotData[0].name} Bookings
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th>User Id</th>
                      <th>Booking Id</th>
                      <th>Booking Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((d) => {
                      return d === undefined ? (
                        <p className={"warning-message"}>No Data to display.</p>
                      ) : (
                        <tr key={d._id}>
                          <td>{d.userId}</td>
                          <td>{d._id}</td>
                          <td>
                            {new Date(d.date).toLocaleDateString("en-US", {
                              date: "2-digit",
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default MyLocationBookingsPage;
