import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { useEffect } from "react";

function Login() {
  const navitage = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
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
      const { password, username } = value;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === false) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navitage("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "") {
      toast.error("Email and password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register here</Link>
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

export default Login;
