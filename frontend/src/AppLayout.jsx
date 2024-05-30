// AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'; // Adjust the path as necessary

const AppLayout = () => (
    <>
        <Navbar />
        <div style={{ marginLeft: '200px', padding: '20px' }}>
            <Outlet />
        </div>
    </>
);

export default AppLayout;
