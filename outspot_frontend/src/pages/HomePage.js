import React, { useCallback, useEffect, useState, useContext } from "react";
import axios from "axios";

import Message from "../components/ui/Message";
import Navbar from "../components/ui/Navbar/Navbar";
import BlogSection from "./BlogSection/BlogSection";
import SpotSection from "./SpotSection/SpotSection";
import ReactDOM from "react-dom";
import Footer from "../components/ui/Footer";
import ShowMessageContext from "../context/showMessageContext/show-message-context";
import LoadingContext from "../context/LoadingContext/LoadingContext";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import { NavLink } from "react-router-dom";

const HomePage = (props) => {
  const showMessageCtx = useContext(ShowMessageContext);
  const { setIsLoading, isLoading } = useContext(LoadingContext);

  const [spotDataPicnic, setSpotDataPicnic] = useState([]);
  const [spotDataCamping, setSpotDataCamping] = useState([]);

  const [blogData, setBlogData] = useState([]);

  const getSpotData = async (type) => {
    const res = await axios.get(`http://localhost:90/spots/type=${type}`);

    return res.data.data;
  };

  const getBlogData = async () => {
    const res = await axios.get(`http://localhost:90/blogs/all`);
    return res.data.data;
  };

  const getAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await Promise.all([
        getSpotData("Picnic"),
        getSpotData("Camping"),
        getBlogData(),
      ]);

      setSpotDataPicnic(data[0]);
      setSpotDataCamping(data[1]);
      setBlogData(data[2]);

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }, [setIsLoading]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const removeMessageHandler = () => {
    showMessageCtx.setShowMessage(false, "");
  };

  return (
    <>
      {setSpotDataCamping.length === 0 &&
        spotDataPicnic.length === 0 &&
        blogData.length === 0 &&
        isLoading && <LoadingSpinner />}

      {ReactDOM.createPortal(
        <Message
          containerName={"success-message-container"}
          state={"success"}
          className={showMessageCtx.showMessage ? "reveal" : ""}
          message={showMessageCtx.message}
          onClick={removeMessageHandler}
        />,
        document.getElementById("message-root")
      )}

      <Navbar />
      {spotDataPicnic.length === 0 && setSpotDataCamping.length === 0 && (
        <p className="warning-msg">No picnic data available</p>
      )}
      <SpotSection
        sectionHeading={"Camping and Picnic Spots"}
        spotData={spotDataCamping.slice(0, 10)}
      />
      <div className="view-all-container">
        <NavLink to={"/location/all"} className={"view-all-link"}>
          View all Spots &#8594;
        </NavLink>
      </div>
      {blogData.length === 0 && (
        <p className="warning-msg">No any blog data available</p>
      )}
      <BlogSection heading="blogs" blogData={blogData.slice(0, 6)} />
      <div className="view-all-container">
        <NavLink to={"/blog/all"} className={"view-all-link"}>
          View all Blogs &#8594;
        </NavLink>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
