import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../contextApi/state";

import "./style.css";
const User = () => {
  const [user, setUser] = useState([]);
  const [{ allUsers }, dispatch] = useStateValue();

  console.log("all", allUsers);
  const handleDelete = async (e) => {
    const userId = e;
    console.log("idd", userId);
    try {
      const adminToken = JSON.parse(localStorage.getItem("user"));
      console.log(adminToken.accesstoken);
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
        headers: {
          token: `Bearer ${adminToken.accesstoken}`,
        },
      });
      alert("user deleted!");
      window.location.reload();
    } catch (error) {
      console.log(JSON.parse(error));
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const adminToken = JSON.parse(localStorage.getItem("user"));

        const res = await axios.get(
          "http://localhost:5000/api/admin/users/all/users",
          {
            headers: {
              token: `Bearer ${adminToken.accesstoken}`,
            },
          }
        );
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: res.data,
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="activeUserContainer">
      <h1>Users</h1>
      <table className="customers">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>city</th>
          <th>qualification</th>
          <th>phone no</th>
          <th>isAdmin</th>
          <th>Active status</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>

        {user.map((user) => (
          <>
            <tr>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.qualification}</td>
              <td>{user.phone_no}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>{user.isDelete ? "Deactive" : "Active"}</td>
              <td>
                {!user.isDelete ? (
                  <button
                    value={user._id}
                    onClick={(e) => handleDelete(e.target.value)}
                  >
                    Delete
                  </button>
                ) : (
                  "Deleted"
                )}
              </td>
              <td>
                <button className="">Edit</button>
              </td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};

export default User;
