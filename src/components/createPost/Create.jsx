import React, { useState } from "react";
import axios from "axios";
import "./style.css";
const Create = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const adminToken = JSON.parse(localStorage.getItem("user"));
      const data = new FormData();
      const filename = photo.name;
      data.append("name", filename);
      data.append("image", photo);
      data.append("title", title);
      const res = await axios.post(
        "http://localhost:5000/api/admin/post/create",
        data,
        {
          headers: {
            token: `Bearer ${adminToken.accesstoken}`,
          },
        }
      );
      alert("post created!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="craeteFormContainer">
        <form
          className="formCreate"
          onSubmit={handleCreatePost}
          encType="multipart/form-data"
        >
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="Post Title.."
            required
          />
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            id="photo"
            accept=".jpeg,.jpg,.png"
            required
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Create;
