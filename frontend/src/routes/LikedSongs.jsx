import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
// import { collection, query, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
// import { db } from "../../../backend/firebase";
import "../styles/likedsongs.css";

const LikedSongs = () => {
  const { userData } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    // fetching data from the firestore database
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/liked-songs/${id}`
        );
        // Construct a query to get the liked_tracks field from all documents in the users collection
        // const usersRef = collection(db, "users");
        // const docsnap = await getDocs(usersRef);

        // // Extract the liked_tracks field from each document
        // const tracks = docsnap.docs.map((doc) => doc.data().liked_tracks);
        // console.log(tracks);
        setLikedSongs(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching liked tracks:", error);
      }
    };

    fetchLikedSongs();
  }, []);

  return (
    <div className="main-content">
      <Navbar />
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
          <div className="songs-placeholder">
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
                {likedSongs.map((track, index) => (
                  <tr key={index}>
                    <td>
                    <img src={track.track_img}></img>
                    </td>
                    <td>{track.track_name}</td>
                    <td>{track.track_artist}</td>
                    <td>{track.track_album}</td>
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
