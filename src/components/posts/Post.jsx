import React from "react";
import "./style.css";
const Post = ({ image, title }) => {
  return (
    <>
      <div className="container">
        <div className="postWrapper">
          <img
            className="postImage"
            src={`http://localhost:5000/${image}`}
            alt="image"
          />
          <span>{title}</span>
        </div>
      </div>
    </>
  );
};

export default Post;
