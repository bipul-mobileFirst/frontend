import axios from "axios";
import React, { useEffect, useState } from "react";
// import Posts from "../../../../../mern projects/social-media/backend/model/Posts";
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/posts/Post";
// import { useStateValue } from "../../contextApi/state";
import "./style.css";
const Home = () => {
  const [post, setPost] = useState([]);
  console.log("paaa", post);
  // const [{ user, allPosts }, dispatch] = useStateValue();
  // console.log("all post", allPosts);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/public/post/all"
        );
        setPost(
          res.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
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
            liked={item.likes}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
