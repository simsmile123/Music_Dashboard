import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Login from './routes/Login.jsx';
import Home from './routes/Home.jsx';
import Profile from './routes/Profile.jsx';
import LikedSongs from './routes/LikedSongs.jsx';
import TopArtists from './routes/TopArtists.jsx';
import TopSongs from './routes/TopSongs.jsx';
import Explore from './routes/Explore.jsx';
import Inbox from './routes/Inbox.jsx';
import Forum from './routes/Forum.jsx';
import Chat from './routes/components/Chat.jsx';
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
        path: "/liked-songs", 
        element: <LikedSongs />,
    },    
    {
        path: "/top-artists",
        element: <TopArtists />,
    },
    {
        path: "/top-songs",
        element: <TopSongs />,
    },
    {
      path: "/explore",
      element: <Explore />,
    },
    {
      path: "/inbox",
      element: <Inbox />,
    },
    {
      path: "/forum",
      element: <Forum />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)