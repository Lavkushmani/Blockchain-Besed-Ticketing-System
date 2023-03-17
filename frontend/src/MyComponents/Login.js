import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let nav = useNavigate();

  const notify = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username !== "" && password !== "") {
      axios
        .post("http://localhost:3001/login/", {
          userid: username,
          password: password,
        })
        .then((res) => {
         // console.log("console", res);

          if (res.data && res.data.length === 1) {
            toast.success("Login Successfull !!", {
              position: "top-center",
              autoClose: 100,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            // props.setUsername(username);
            props.user(username);
            nav("/choose");
          } else {
            toast.error("Username or password is incorrect !!", notify);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const showpass = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div id="container-login" className="container">
      <h3>Ticket Management System Login Page By Group-20</h3>
      {/* <img className="logo" src={logo} alt=""></img> */}

      <form onSubmit={handleSubmit} id="form-login">
        <div className="input-field">
          <FaUser className="input-icon" />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <FaLock className="input-icon" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input className="pass" type="checkbox" onClick={showpass} />
          Show Password
        </div>
        <Link to="/register">
          New User? Click here for sign up !
        </Link>
        <div>

        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
