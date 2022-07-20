import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navitage = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navitage("/");
    }
  }, []);
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navitage("/setAvatar");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 charater", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error(
        "Username should be equal or greater than 6 charater",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="" alt="" />
            <h1>Talk to me</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login here</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #515c6d;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #2a2d32;
    border-radius: 2rem;
    padding: 3rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #fff;
      border-radius: 0.5rem;
      width: 100%;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #515c6d;
        outline: none;
      }
    }
    button {
      background-color: #515c6d;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 800;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #6e6f74;
      }
    }
    span {
      color: white;
      a {
        color: #515c6d;
        text-decoration: none;
        &:hover {
          color: #fff;
        }
      }
    }
  }
`;

export default Register;
