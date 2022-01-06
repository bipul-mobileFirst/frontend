import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../contextApi/state";
import "./style.css";
const Post = ({ image, title, id }) => {
  const [{ user }, dispatch] = useStateValue();

  const admin = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="card">
        <img
          className="postImage"
          src={`http://localhost:5000/${image}`}
          alt="image"
        />
        <hr />
        {admin.isAdmin ? (
          <>
            <div className="eventsController" key={id}>
              <Link to="/" className="linksEditDelete editButton">
                Edit
              </Link>
              <span className="">Title: {title}</span>
              <Link to="/" className="linksEditDelete deleteButton">
                Delete
              </Link>
            </div>
          </>
        ) : (
          <span className="titlePost">Title: {title}</span>
        )}
        {/* <span className="titlePost">{title}</span> */}
      </div>
    </>
  );
};

export default Post;
