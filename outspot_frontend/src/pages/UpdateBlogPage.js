import React, { useState, useEffect, useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Navbar from "../components/ui/Navbar/Navbar";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";
import Footer from "../components/ui/Footer";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoadingContext from "../context/LoadingContext/LoadingContext";
import ShowMessageContext from "../context/showMessageContext/show-message-context";
import updateBlogImage from "../assets/Images/add-blog-img.jpg";

const UpdateBlogPage = () => {
  const loadingCtx = useContext(LoadingContext);

  const showMessageCtx = useContext(ShowMessageContext);

  const navigate = useNavigate();

  const { isLoading, setIsLoading } = loadingCtx;
  const [uploadedImage, setUploadedImage] = useState();

  const [enteredTitle, setEnteredTitle] = useState();
  const [enteredSubtitle, setEnteredSubtitle] = useState();
  const [enteredDescritpiton, setEnteredDescription] = useState();

  const imageUploadHandler = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const blogTitleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const blogSubtitleChangeHandler = (e) => {
    setEnteredSubtitle(e.target.value);
  };

  const blogDescriptionChangeHandler = (e) => {
    setEnteredDescription(e.target.value);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname.split("/")[3];
    const getBlogData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:90/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsLoading(false);

        const blogData = res.data.blogData;
        setEnteredTitle(blogData.title);
        setEnteredDescription(blogData.description);
        setEnteredTitle(blogData.title);
      } catch (err) {
        console.log(err);
      }
    };
    getBlogData();
  }, [pathname, setIsLoading]);

  const updateLocationFormSubmitHandler = async (e) => {
    const data = new FormData();

    data.append("title", enteredTitle);
    data.append("subtitle", enteredSubtitle);
    data.append("description", enteredDescritpiton);
    data.append("img", uploadedImage);

    const id = pathname.split("/")[3];

    try {
      setIsLoading(true);

      await axios.put(`http://localhost:90/blogs/update/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setIsLoading(false);
      showMessageCtx.setShowMessage(true, "Blog updated successfully");
      navigate(`/blog/${id}`);
    } catch (err) {
      if (err.response.data.message) setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Navbar />
      <Form
        onSubmit={updateLocationFormSubmitHandler}
        img={updateBlogImage}
        heading={"Update Blog details"}
        classname="update-blog-container"
      >
        <Input
          value={enteredTitle}
          id="spotName"
          type="text"
          placeholder="Enter title for blog"
          label="Blog title"
          onChanged={blogTitleChangeHandler}
        />
        <Input
          value={enteredSubtitle}
          id="spotName"
          type="text"
          placeholder="Enter subtitle for blog"
          label="Blog subtitle"
          onChanged={blogSubtitleChangeHandler}
        />
        <div className="description-container">
          <label htmlFor="description">Spot Description</label>
          <textarea
            value={enteredDescritpiton}
            id="description"
            placeholder="Write blog here..."
            onChange={blogDescriptionChangeHandler}
          ></textarea>
        </div>

        <Input
          id={"spotImg"}
          type={"file"}
          label={"Add spot Image"}
          onChanged={imageUploadHandler}
        />
        <button className="btn--update-blog btn-custom" type="submit">
          Update blog
        </button>
      </Form>
      <Footer />
    </>
  );
};
export default UpdateBlogPage;
