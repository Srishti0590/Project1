import React from "react";
import { NavLink } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";

import Card from "../../components/ui/Card";

const Blog = (props) => {
  return (
    <div className="col p-4 justify-self-stretch align-self-stretch">
      <Card classname={`home-container`}>
        <img src={props.src} alt="blog pics" className="home-img blog-img" />
        <div className="blog-contents">
          <div className="blog-info">
            <div className="author-info">
              <FaUserAlt className="blog-icon" />
              <p className="author-name">{props.author}</p>
            </div>
            <div className="date-info">
              <AiOutlineCalendar className="blog-icon" />
              <p className="written-date">
                {new Date(props.writtenDate).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </p>
            </div>
          </div>
          <h4 className="blog-title">
            <NavLink to={`/blog/${props.id}`}>{props.title}</NavLink>
          </h4>
          <p className="blog-subtitle">{props.subtitle}</p>
          <p className="blog-description">{props.description}</p>
        </div>
      </Card>
    </div>
  );
};
export default React.memo(Blog);
