import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../contextApi/state";
import axios from "axios";
import Modal from "react-modal";
import "./style.css";
import { useSelector } from "react-redux";
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
const Post = ({ image, title, id, liked }) => {
  const { currentUser, isAdmin } = useSelector((state) => state.users);
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [like, setLike] = useState(false);

  const handleUpatePost = async (e) => {
    const id = e;
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
              token: `Bearer ${currentUser.accesstoken}`,
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
              token: `Bearer ${currentUser.accesstoken}`,
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
          token: `Bearer ${currentUser.accesstoken}`,
        },
      });
      console.log("post deleted!");
      alert("post deleted!");
      window.location.reload();
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  const handleLike = async (e) => {
    const postId = e.target.value;
    console.log(postId);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/public/post/liked/single/${postId}`,
        {},
        {
          headers: {
            token: `Bearer ${currentUser.accesstoken}`,
          },
        }
      );
      console.log("res", res);
      setLike(!like);
    } catch (error) {
      console.log(JSON.parse(error));
    }
  };
  useEffect(() => {
    setLike(liked.includes(currentUser._id));
  }, [currentUser._id, liked]);
  return (
    <>
      <div className="card">
        <img
          className="postImage"
          src={`http://localhost:5000/${image}`}
          alt="image"
        />
        <hr />
        {isAdmin ? (
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
          <div className="userEventsContainer">
            {like ? (
              <button
                value={id}
                onClick={handleLike}
                className="likeButton liked"
              >
                Liked
              </button>
            ) : (
              <button value={id} onClick={handleLike} className="likeButton ">
                Like
              </button>
            )}

            <span className="titlePost">Title: {title}</span>
          </div>
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
