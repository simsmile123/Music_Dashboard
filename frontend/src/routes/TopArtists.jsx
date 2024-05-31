import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
// import { collection, query, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
// import { db } from "../../../backend/firebase";
import "../styles/topartists.css";

const TopArtists = () => {
  const { userData } = useContext(AuthContext);
  const [topArtists, setTopArtists] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    // fetching data from the firestore database
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/top-artists/${id}`
        );

        setTopArtists(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchTopArtists();
  }, [id]);

  return (
    <div className="main-content">
      <Navbar />
      <div className="top-artists-container">
        <div className="top-artists-header">
          <h1 id="top-artists-base">Top Artists</h1>
        </div>
        <div className="top-artists-list">
          {topArtists.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>Artist Image</th>
                  <th>Artist</th>
                </tr>
                {topArtists.map((artist, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={artist.artist_img}
                        alt={`Image of ${artist.artist_name}`}
                      ></img>
                    </td>
                    <td>{artist.artist_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-artists-message">No top artists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopArtists;
