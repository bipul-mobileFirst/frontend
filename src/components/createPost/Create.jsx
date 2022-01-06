import React from "react";
import "./style.css";
const Create = () => {
  return (
    <div className="craeteFormContainer">
      <form className="formCreate">
        <label for="title">Post Title</label>
        <input type="text" id="title" placeholder="Post Title.." required />
        <label for="photo">Photo</label>
        <input type="file" id="photo" accept=".jpeg,.jpg,.png" required />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Create;
