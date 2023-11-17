import React, { useState, useCallback, useEffect, useContext } from "react";

import axios from "axios";

import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar/Navbar";
import LoadingContext from "../context/LoadingContext/LoadingContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import Blog from "./BlogSection/Blog";

const MyBlogsPage = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [blogData, setBlogData] = useState([]);

  const getBlogData = useCallback(async () => {
    const res = await axios.get("http://localhost:90/blogs/get/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data.data;
  }, []);

  useEffect(() => {
    const setData = async () => {
      setIsLoading(true);
      const data = await getBlogData();
      setBlogData(data);
      setIsLoading(false);
    };

    setData();
  }, [setIsLoading, getBlogData]);
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Navbar />
      {blogData.length === 0 ? (
        <p className="warning-msg">No any blog data.</p>
      ) : (
        <Blog
          headingStyle={"heading-style"}
          heading={`${localStorage.getItem("userFullName")}'s Blogs`}
          blogData={blogData}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};

export default MyBlogsPage;
