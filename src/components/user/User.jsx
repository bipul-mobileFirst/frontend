import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/AdminRedux";
import "./style.css";

const customStyles = {
  content: {
    width: "35%",
    height: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    fontSize: "12px",
  },
  overlay: {
    backgroundColor: "transparent",
  },
};

const User = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { allUser, currentUser } = useSelector((state) => state.users);
  console.log("cuurent user", currentUser);
  console.log("alll users", allUser);
  const [isOpen, setIsOpen] = useState(false);
  const [singleUser, setSingleUser] = useState("");

  const username = useRef();
  const email = useRef();
  const city = useRef();
  const qualification = useRef();
  const phone_no = useRef();
  const isAdmin = useRef();
  const isDelete = useRef();

  const handleDelete = async (e) => {
    const userId = e;
    console.log("idd", userId);
    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
        headers: {
          token: `Bearer ${currentUser.accesstoken}`,
        },
      });

      alert("user deleted!");
      window.location.reload();
    } catch (error) {
      console.log(JSON.parse(error));
    }
  };

  const getUser = (e) => {
    setSingleUser(allUser.find((u) => u._id === e));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/update/" + singleUser._id,
        {
          username: username.current.value || singleUser.username,
          email: email.current.value || singleUser.email,
          city: city.current.value || singleUser.city,
          qualification:
            qualification.current.value || singleUser.qualification,
          phone_no: phone_no.current.value || singleUser.phone_no,
          isAdmin: isAdmin.current.value || singleUser.isAdmin,
          isDelete: isDelete.current.value || singleUser.isDelete,
        },
        {
          headers: {
            token: `Bearer ${currentUser.accesstoken}`,
          },
        }
      );
      alert("user updated!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/users/all/users",
          {
            headers: {
              token: `Bearer ${currentUser.accesstoken}`,
            },
          }
        );
        dispatch(allUsers(res.data));
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

        {allUser.map((user) => (
          <>
            <tr key={user._id}>
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
                    className="deleteButtonUsers"
                  >
                    Delete
                  </button>
                ) : (
                  <span className="deletedButton">Deleted</span>
                )}
              </td>
              <td>
                <button
                  value={user._id}
                  onClick={(e) => {
                    getUser(e.target.value);
                    setIsOpen(!isOpen);
                  }}
                  className="editButtonUsers"
                >
                  Edit
                </button>
              </td>
            </tr>
          </>
        ))}
      </table>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpen(!isOpen)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Edit users</h1>
          <span
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "red", cursor: "pointer" }}
          >
            close
          </span>
        </div>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder={singleUser.username}
          ref={username}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder={singleUser.email}
          ref={email}
        />
        <label htmlFor="city">City</label>
        <input id="city" type="text" placeholder={singleUser.city} ref={city} />
        <label htmlFor="qua">Qualification</label>
        <input
          id="qua"
          type="text"
          placeholder={singleUser.qualification}
          ref={qualification}
        />
        <label htmlFor="no">Phone No</label>
        <input
          id="no"
          type="text"
          placeholder={singleUser.phone_no}
          ref={phone_no}
        />
        <label htmlFor="Role">User Role</label>
        <select id="Role" defaultValue={singleUser.isAdmin} ref={isAdmin}>
          <option disabled>Select role</option>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </select>
        <label htmlFor="status">Status</label>
        <select id="status" defaultValue={singleUser.isDelete} ref={isDelete}>
          <option disabled>Active status</option>
          <option value="0">active</option>
          <option value="1">Deactive</option>
        </select>
        <button
          style={{
            padding: "10px",
            border: "none",
            backgroundColor: "#2154ab",
            color: "white",
          }}
          onClick={handleUpdateUser}
        >
          update user
        </button>
      </Modal>
    </div>
  );
};

export default User;
