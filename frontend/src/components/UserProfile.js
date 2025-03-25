// frontend/src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState({ name: '', age: '', gender: '', profilePic: '' });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }, // Ensure token is passed correctly
                });
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            {user.profilePic && <img src={`http://localhost:5000/uploads/${user.profilePic}`} alt="Profile" width="100" />}
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
        </div>
    );
};

export default UserProfile;
