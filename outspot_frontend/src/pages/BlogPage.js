import React, { useEffect, useState, useContext } from "react";

import ReactDOM from "react-dom";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Navbar from "../components/ui/Navbar/Navbar";
import Footer from "../components/ui/Footer";
import Message from "../components/ui/Message";
import WarningCard from "../components/ui/WarningCard";
import ShowMessageContext from "../context/showMessageContext/show-message-context";

import LoadingContext from "../context/LoadingContext/LoadingContext";

import LoadingSpinner from "../components/ui/LoadingSpinner";

const BlogPage = () => {
  const navigate = useNavigate();

  const showMessageCtx = useContext(ShowMessageContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [individualBlogData, setIndividualBlogData] = useState();
  const [showWarning, setShowWarning] = useState(false);

  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  useEffect(() => {
    const id = pathname.split("/")[2];

    const getBlogData = async () => {
      setIsLoading(true);

      const res = await axios.get(`http://localhost:90/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIndividualBlogData(res.data.blogData);
      setIsLoading(false);
    };
    getBlogData();
  }, [pathname, setIsLoading]);

  const removeMessageHandler = () => {
    showMessageCtx.setShowMessage(false);
  };

  const showWarningMessage = () => {
    setShowWarning(true);
  };

  const closeWarningMessage = () => {
    setShowWarning(false);
  };

  const deleteBlogHandler = async () => {
    try {
      await axios.delete(`http://localhost:90/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      showMessageCtx.setShowMessage(true, "Blog deleted successfully");

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return individualBlogData !== undefined ? (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Message
          containerName={"success-message-container"}
          state="success"
          className={showMessageCtx.showMessage ? "reveal" : ""}
          message={showMessageCtx.message}
          onClick={removeMessageHandler}
        />,
        document.getElementById("message-root")
      )}
      {showWarning
        ? ReactDOM.createPortal(
            <WarningCard
              onClose={closeWarningMessage}
              onClick={deleteBlogHandler}
            />,
            document.getElementById("message-root")
          )
        : ""}
      <Navbar />
      <section className={`container ${"blog-container"}`}>
        <header>
          <h2 className={`secondary-heading ${"blog-heading"}`}>
            {individualBlogData.title}
          </h2>
          <h4 className={"blog-subtitle"}>{individualBlogData.subtitle}</h4>
          <p className={"blog-meta-info"}>
            Posted by <b>{individualBlogData.authorName}</b> on{" "}
            {new Date(individualBlogData.writtenDate).toLocaleDateString(
              "en-US",
              { dateStyle: "full" }
            )}
          </p>
        </header>

        <main>
          <img
            src={individualBlogData.imageURL}
            alt="Bitcoin"
            className={"blog-img"}
          />
          {/* <div className={'blog-description-container'}>
              {individualBlogData.description
                .split('\n\n')
                .map((paragraph, i) => {
                  return <p key={i}>{paragraph}</p>;
                })}
            </div> */}
          <p className={"blog-description"}>{individualBlogData.description}</p>
        </main>
        <footer>
          {localStorage.getItem("userId") === individualBlogData.userId ? (
            <ul className={"user-control-list"}>
              <NavLink
                to={`/blog/update/${pathname.split("/")[2]}`}
                className={"button-update"}
              >
                Update Blog
              </NavLink>
              <button onClick={showWarningMessage} className={"button-delete"}>
                Delete Blog
              </button>
            </ul>
          ) : (
            ""
          )}
        </footer>
      </section>
      <Footer />
    </React.Fragment>
  ) : (
    isLoading && <LoadingSpinner />
  );
};

export default BlogPage;
