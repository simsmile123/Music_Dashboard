import React from "react";
import "../styles/Home.css"; // Assuming you place the CSS in Home.css
import detaitImg from "../assets/detait-SXyfhR4jmRA-unsplash.jpg";
import gabrielImg from "../assets/gabriel-gurrola-2UuhMZEChdc-unsplash.jpg";
import marekImg from "../assets/marek-piwnicki-wgsu3WzFZ5c-unsplash.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <main className="main-content">
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
        {/* replace this stuff with the fetch from spotify api */}
        <div className="top-albums">
          <h2>Top Albums</h2>
          <div className="album-list">
            <div className="album-item">
              <img src="../assets/queen.jpg" alt="Queen" />
              <p>Queen</p>
            </div>
            <div className="album-item">
              <img src="../assets/king.jpg" alt="King" />
              <p>King</p>
            </div>
            <div className="album-item">
              <img src="../assets/rooky.jpg" alt="Rooky" />
              <p>Rooky</p>
            </div>
            <div className="album-item">
              <img src="../assets/poker.jpg" alt="Poker" />
              <p>Poker</p>
            </div>
            <div className="album-item">
              <img src="../assets/queen.jpg" alt="Queen" />
              <p>Queen</p>
            </div>
          </div>
        </div>
        {/* replace this stuff with the fetch from spotify api */}
        <div className="top-hits">
          <h2>Your Top Hits of the Month</h2>
          <div className="hits-list">
            <div className="hit-item">
              <img src="../assets/queen.jpg" alt="Water" />
              <p>Water</p>
            </div>
            <div className="hit-item">
              <p>Fire</p>
            </div>
            <div className="hit-item">
              <img src="../assets/queen.jpg" alt="Dance with me" />
              <p>Dance with me</p>
            </div>
            <div className="hit-item">
              <p>My love is hot</p>
            </div>
            <div className="hit-item">
              <img src="../assets/queen.jpg" alt="Water" />
              <p>Water</p>
            </div>
            <div className="hit-item">
              <p>Fire</p>
            </div>
            <div className="hit-item">
              <img src="../assets/queen.jpg" alt="Dance with me" />
              <p>Dance with me</p>
            </div>
            <div className="hit-item">
              <p>My love is hot</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
