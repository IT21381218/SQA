// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // If no token, navigate to login
                return;
            }
            
            console.log("Token: ", token); // Log the token to check it
    
            try {
                const { data } = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }, // Add 'Bearer' before the token
                });
                setUser(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <img src={user.profilePic} alt="Profile" />
                    <p>NIC: {user.nic}</p>
                    <p>Age: {user.age}</p>
                    <p>Gender: {user.gender}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default Dashboard;
