import React, { useReducer, useState, useContext } from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import Navbar from "../components/ui/Navbar/Navbar";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";
import Footer from "../components/ui/Footer";
import Message from "../components/ui/Message";
import addBlogImage from "../assets/Images/add-blog-img.jpg";

import LoadingContext from "../context/LoadingContext/LoadingContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const initialBlogState = {
  value: "",
  isValid: false,
};

const blogReducer = (state, action) => {
  if ((action.type = "USER_INPUT")) {
    return { value: action.value, isValid: action.value.trim().length !== 0 };
  }
  return initialBlogState;
};
const AddBlog = () => {
  const loadingCtx = useContext(LoadingContext);

  const [blogTitleState, dispatchBlogTitle] = useReducer(
    blogReducer,
    initialBlogState
  );
  const [blogSubtitleState, dispatchBlogSubtitle] = useReducer(
    blogReducer,
    initialBlogState
  );
  const [blogDescriptionState, dispatchBlogDescription] = useReducer(
    blogReducer,
    initialBlogState
  );

  const [blogTitleError, setBlogTitleError] = useState(false);
  const [blogSubtitleError, setBlogSubtitleError] = useState(false);
  const [blogDescriptionError, setBlogDescriptionError] = useState(false);

  const [uploadedImage, setUploadedImage] = useState();

  const [isBlogCreated, setIsBlogCreated] = useState(false);
  const [blogCreateError, setBlogCreateError] = useState(false);

  const blogTitleChangeHandler = (e) => {
    dispatchBlogTitle({ type: "USER_INPUT", value: e.target.value });
  };

  const blogSubtitleChangeHandler = (e) => {
    dispatchBlogSubtitle({ type: "USER_INPUT", value: e.target.value });
  };
  const blogDescriptionChangeHandler = (e) => {
    dispatchBlogDescription({ type: "USER_INPUT", value: e.target.value });
  };
  const imageUploadHandler = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const resetError = () => {
    setBlogTitleError(false);
    setBlogSubtitleError(false);
    setBlogDescriptionError(false);
  };

  const addBlogFormSubmitHandler = async (e) => {
    e.preventDefault();

    resetError();
    if (!blogTitleState.isValid) {
      setBlogTitleError(true);
      return;
    }
    if (!blogSubtitleState.isValid) {
      setBlogSubtitleError(true);
    }
    if (!blogDescriptionState.isValid) {
      setBlogDescriptionError(true);
    }

    const data = new FormData();
    data.append("title", blogTitleState.value);
    data.append("subtitle", blogSubtitleState.value);

    data.append("description", blogDescriptionState.value);
    data.append("img", uploadedImage);

    try {
      loadingCtx.setIsLoading(true);
      const res = await axios.post("http://localhost:90/blogs/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsBlogCreated(true);
      loadingCtx.setIsLoading(false);
      setBlogCreateError(false);
      console.log(res);
    } catch (err) {
      if (err.response.data.message) {
        loadingCtx.setIsLoading(false);
        setBlogCreateError(true);
      }
    }
  };

  const removeMessageHandler = () => {
    setIsBlogCreated(false);
    setBlogCreateError(false);
  };

  return (
    <>
      {loadingCtx.isLoading && <LoadingSpinner />}
      {ReactDOM.createPortal(
        <Message
          state={blogCreateError ? "error" : isBlogCreated ? "success" : ""}
          className={isBlogCreated || blogCreateError ? "reveal" : ""}
          message={
            blogCreateError
              ? "Error while adding blog"
              : isBlogCreated
              ? "Blog created successfully"
              : ""
          }
          onClick={removeMessageHandler}
          containerName={
            blogCreateError
              ? "error-message-container"
              : isBlogCreated
              ? "success-message-container"
              : ""
          }
        />,
        document.getElementById("message-root")
      )}
      <Navbar />
      <Form
        onSubmit={addBlogFormSubmitHandler}
        img={addBlogImage}
        heading={"Add blog"}
        classname={"add-blog-container"}
      >
        <Input
          id="blogTitle"
          type="text"
          placeholder="Enter blog Tilte"
          label="Blog title"
          onChanged={blogTitleChangeHandler}
        />
        {blogTitleError && (
          <p className="error-message">Blog title cannot be empty</p>
        )}
        <Input
          id="blogSubtitle"
          type="text"
          placeholder="Enter blog subtitle"
          label="Blog subtile"
          onChanged={blogSubtitleChangeHandler}
        />
        {blogSubtitleError && (
          <p className="error-message">Blog subtitle can not be empty</p>
        )}
        <div className="description-container">
          <label htmlFor="blogDescription">Spot Description</label>
          <textarea
            id="blogDescription"
            placeholder="Enter your blog here"
            onChange={blogDescriptionChangeHandler}
          ></textarea>
        </div>
        {blogDescriptionError && (
          <p className="error-message">Blog description cannot be empty</p>
        )}

        <Input
          id="blogImg"
          type="file"
          label="Add blog Image"
          onChanged={imageUploadHandler}
        />
        <button className="btn--add-blog btn-custom" type="submit">
          Add Blog
        </button>
      </Form>
      <Footer />
    </>
  );
};
export default AddBlog;
