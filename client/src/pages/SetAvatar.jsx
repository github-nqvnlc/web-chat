import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "http://api.multiavatar.com/45678946";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
<<<<<<< HEAD
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(data);
=======
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const data =  await axios.post(`${setAvatars}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log({data});
>>>>>>> eec657b3d1c824d506caf3832c56e9d23a8bdc2f
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
<<<<<<< HEAD
        navigate("/");
=======
        navigate('/'); 
>>>>>>> eec657b3d1c824d506caf3832c56e9d23a8bdc2f
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fecthData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
<<<<<<< HEAD
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
=======
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
>>>>>>> eec657b3d1c824d506caf3832c56e9d23a8bdc2f
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fecthData();
  }, []);

  return (
    <>
<<<<<<< HEAD
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    key={index}
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
=======
      {
        isLoading ? <Container>
          <img src={loader} alt="loader" />
        </Container> : (
          <Container>
            <div className="title-container">
              <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${selectedAvatar === index ? "selected" : ""
                      }`}
                  >
                    <img
                      key={index}
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>Set as profile picture</button>
          </Container>
        )}
>>>>>>> eec657b3d1c824d506caf3832c56e9d23a8bdc2f
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    display: flex;
    justify-content: center;
    align-item: center;
    flex-direction: column;
    gap: 3rem;
    h1 {
      text-align: center;
      color: #fff;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #fff;
    }
<<<<<<< HEAD
  }
  .submit-btn {
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
=======
>>>>>>> eec657b3d1c824d506caf3832c56e9d23a8bdc2f
  }
  .submit-btn {
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
`;
