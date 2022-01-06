import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
const Activeusers = () => {
  const [activeUser, setActiveUser] = useState([]);

  console.log("active users", activeUser);
  useEffect(() => {
    const getAllActiveUsers = async () => {
      try {
        const tokenAdmin = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          "http://localhost:5000/api/admin/users/all/active/user",
          {
            headers: {
              token: `Bearer ${tokenAdmin.accesstoken}`,
            },
          }
        );
        setActiveUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllActiveUsers();
  }, []);
  return (
    <div className="activeUserContainer">
      <h1>Active users</h1>
      <table className="customers">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>city</th>
          <th>qualification</th>
          <th>phone no</th>
          <th>isAdmin</th>
          <th>Active status</th>
        </tr>

        {activeUser.map((actives) => (
          <>
            <tr>
              <td>{actives.username}</td>
              <td>{actives.email}</td>
              <td>{actives.city}</td>
              <td>{actives.qualification}</td>
              <td>{actives.phone_no}</td>
              <td>{actives.isAdmin ? "Yes" : "No"}</td>
              <td>{actives.isDelete ? "Deactive" : "Active"}</td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};

export default Activeusers;
