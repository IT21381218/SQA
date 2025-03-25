// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nic, setNic] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nic', nic);
        formData.append('age', age);
        formData.append('gender', gender);
        if (profilePic) formData.append('profilePic', profilePic);

        try {
            await axios.post('http://localhost:5000/api/users/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Try again with valid data.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
