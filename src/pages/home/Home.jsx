import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/posts/Post";
import { useStateValue } from "../../contextApi/state";
import "./style.css";
const Home = () => {
  const [post, setPost] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  console.log("user", user);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/public/post/all"
        );
        console.log(res.data);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  return (
    <>
      <div className="postContainer">
        {post.map((item) => (
          <Post
            key={item._id}
            image={item.image}
            title={item.title}
            id={item._id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
