import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import LikedSongs from "./routes/LikedSongs";
import TopArtists from "./routes/TopArtists";
import TopSongs from "./routes/TopSongs";
import Explore from "./routes/Explore";
import Inbox from "./routes/Inbox";
import Forum from "./routes/Forum";
import './index.css';

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liked-songs" element={<LikedSongs />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/top-songs" element={<TopSongs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </div>
    </div>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./routes/Login.jsx";
// import Home from "./routes/Home.jsx";
// import Profile from "./routes/Profile.jsx";
// import LikedSongs from "./routes/LikedSongs.jsx";
// import TopArtists from "./routes/TopArtists.jsx";
// import TopSongs from "./routes/TopSongs.jsx";
// import Explore from "./routes/Explore.jsx";
// import Inbox from "./routes/Inbox.jsx";
// import Forum from "./routes/Forum.jsx";
// import Chat from "./components/Chat.jsx";

// import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/liked-songs",
//     element: <LikedSongs />,
//   },
//   {
//     path: "/top-artists",
//     element: <TopArtists />,
//   },
//   {
//     path: "/top-songs",
//     element: <TopSongs />,
//   },
//   {
//     path: "/explore",
//     element: <Explore />,
//   },
//   {
//     path: "/inbox",
//     element: <Inbox />,
//   },
//   {
//     path: "/forum",
//     element: <Forum />,
//   },
//   {
//     path: "/chat",
//     element: <Chat />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
