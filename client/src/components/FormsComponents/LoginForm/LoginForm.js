import React, { useState } from "react";
import './LoginForm.css';
import api from '../../../utils/api';
import { Link } from "react-router";

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'email is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await api.post('auth/login', formData);
            const now = new Date()
            const item = {
                value: response.data.token,
                expiry: now.getTime() + 86400000,
            }
            localStorage.setItem('key', JSON.stringify(item));
            window.location.href = '/';
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <p className="title">Login</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="" value={formData.email} onChange={handleInputChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="" value={formData.password} onChange={handleInputChange} />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button className="sign">Sign in</button>
            </form>
            <p className="signup">Don't have an account?
                <Link to="/signup" className="sign-up-link"> Sign up</Link>
            </p>
        </div>
    );
}
export default Login;