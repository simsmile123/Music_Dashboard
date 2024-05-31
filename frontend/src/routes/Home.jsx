import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/Home.css"; // Assuming you place the CSS in Home.css
import detaitImg from "../assets/detait-SXyfhR4jmRA-unsplash.jpg";
import gabrielImg from "../assets/gabriel-gurrola-2UuhMZEChdc-unsplash.jpg";
import marekImg from "../assets/marek-piwnicki-wgsu3WzFZ5c-unsplash.jpg";
import banner from "../assets/banner.png";

const Home = () => {
  const [topAlbums, setTopAlbums] = useState([]);
  const [topHits, setTopHits] = useState([]);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get("access_token");
    const refresh_token = urlParams.get("refresh_token");
    const id = localStorage.getItem("id");
    const error = urlParams.get("error");

    if (error) {
      alert("There was an error during the authentication");
    } else {
      if (access_token) {
        login({ access_token, refresh_token, id });
      }
    }
  }, [login]);

  useEffect(() => {
    const fetchUserData = async (id) => {
      //const userId = "azn78voutiey00vb32rjt0f37"; // Replace with dynamic user id

      try {
        const response = await axios.get(
          `http://localhost:5001/top-artists/${id}`
        );
        const userData = response.data;

        if (userData) {
          setTopAlbums(userData.liked_tracks || []);
          setTopHits(userData.chats || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="main-content">
      <Navbar />
      <div className="home-container">
        <div className="parent-container">
          <div className="carousel-section">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src={detaitImg}
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={gabrielImg}
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={marekImg}
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div>
            {" "}
            <img className="banner" src={banner} alt="advertisement" />
          </div>
          {/* <div className="top-albums">
            <h2>Top Albums</h2>
            <div className="album-list">
              {topAlbums.map((album, index) => (
                <div key={index} className="album-item">
                  this is where the firebase logic is 
                  <img src={album.track_img} alt={album.track_name} />
                  <p>{album.track_name}</p>
                  <p> hello</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* // <div className="top-hits">
          //   top genre 
          //   <h2>Your Top Genre</h2>
          //   <div className="hits-list">
          //     {topHits.map((hit, index) => (
          //       <div key={index} className="hit-item">
          //         <p>{hit}</p>
          //       </div>
          //     ))}
          //   </div>
          // </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
