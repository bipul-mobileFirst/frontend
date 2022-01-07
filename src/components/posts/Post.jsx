import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../contextApi/state";
import axios from "axios";
import Modal from "react-modal";
import "./style.css";
const customStyles = {
  content: {
    width: "30%",
    height: "45vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  overlay: {
    backgroundColor: "transparent",
  },
};
const Post = ({ image, title, id }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postId, setPostId] = useState("");
  console.log("idd", postId);

  const admin = JSON.parse(localStorage.getItem("user"));

  const handleUpatePost = async (e) => {
    const id = e;
    const adminToken = JSON.parse(localStorage.getItem("user"));
    if (photo) {
      const data = new FormData();
      const filename = photo.name;
      data.append("name", filename);
      data.append("image", photo);
      data.append("title", postTitle);
      try {
        await axios.put(
          `http://localhost:5000/api/admin/post/update/${id}`,
          data,
          {
            headers: {
              token: `Bearer ${adminToken.accesstoken}`,
            },
          }
        );
        console.log("updated!");
        alert("post updated!");
      } catch (error) {
        console.log("error aya post update ka", error);
      }
    } else {
      try {
        await axios.put(
          `http://localhost:5000/api/admin/post/update/${id}`,
          { title: postTitle },
          {
            headers: {
              token: `Bearer ${adminToken.accesstoken}`,
            },
          }
        );
        console.log("updated!");
        alert("post updated!");
      } catch (error) {
        console.log("error aya post update ka", error);
      }
    }
  };

  const handleDelete = async (e) => {
    const id = e.target.value;
    console.log("khjkh", id);
    if (!window.confirm("Are you sure")) return false;
    try {
      await axios.delete(`http://localhost:5000/api/admin/post/${id}`, {
        headers: {
          token: `Bearer ${admin.accesstoken}`,
        },
      });
      console.log("post deleted!");
      alert("post deleted!");
      window.location.reload();
    } catch (error) {
      console.log("Delete error", error);
    }
  };
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
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="linksEditDelete editButton"
              >
                Edit
              </button>
              <span className="">Title: {title}</span>
              <button
                value={id}
                onClick={handleDelete}
                className="linksEditDelete deleteButton"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <span className="titlePost">Title: {title}</span>
        )}
        {/* <span className="titlePost">{title}</span> */}
      </div>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpen(!isOpen)}
        // contentLabel="Example Modal"
      >
        <h2 style={{ textAlign: "center" }}>Edit Post</h2>
        <label htmlFor="title">Post Title</label>
        <input
          id="title"
          type="text"
          placeholder={title}
          required
          className="editinputClass"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label
          style={{ marginRight: "20px", marginBottom: "10px" }}
          htmlFor="image"
        >
          Image(optional)
        </label>
        <input
          id="image"
          type="file"
          className="editinputClass"
          accept=".jpeg,.jpg"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <div className="buttonContainer">
          <button
            value={id}
            onClick={(e) => handleUpatePost(e.target.value)}
            type="submit"
            className="editUpdateButton"
            disabled={!postTitle && true}
          >
            update
          </button>
          <button
            onClick={(e) => setIsOpen(!isOpen)}
            className="editCloseButton"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Post;
