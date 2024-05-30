import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import "../styles/likedsongs.css"; // Import CSS file
import Navbar from "../components/Navbar";

const LikedSongs = () => {
  const { userData } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/spotify/", {
          params: { access_token: accessToken },
        });
        setLikedSongs(response.data.items);
      } catch (error) {
        console.error("Error fetching liked songs", error);
      }
    };

    if (accessToken) {
      fetchLikedSongs();
    }
  }, [accessToken]);

  return (
    <div className="main-content">
      <Navbar/>
      <div className="liked-songs-container">
        
        <div className="liked-songs-header">
          <img
            src="src/assets/liked-songs.jpeg"
            alt="Liked Songs"
            className="header-image"
          />
          <h1 id="liked-songs-base">Liked Songs</h1>
        </div>
        <div className="liked-songs-list">
          <div
            className="songs-placeholder
          "
          >
            <th> ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
          </div>
          {likedSongs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                {likedSongs.map((song) => (
                  <tr key={song.track.id}>
                    <td>{song.track.name}</td>
                    <td>
                      {song.track.artists.map((artist) => artist.name).join(", ")}
                    </td>
                    <td>{song.track.album.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-songs-message">No liked songs found.</p>
          )}
        </div>
    </div> 
  </div>
  );
};

export default LikedSongs;
