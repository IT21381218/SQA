import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');
            try {
                const { data } = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: token },
                });
                setUser(data);
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    return <h1>Welcome, {user ? user.name : 'Loading...'}</h1>;
};

export default Dashboard;