import React, { useState } from "react";
import './SignupForm.css';
import axios from 'axios';
import { set } from "mongoose";

function SignupForm() {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        verify_password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email || !formData.password || !formData.username || !formData.verify_password) newErrors.requiredElementMissing = 'Please fill the form fully before submitting.';
        if (formData.password !== formData.verify_password) newErrors.verify_password = 'Passwords do not match.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        const sign = document.querySelector('.signup .form-container .sign');
        sign.style.marginTop = '1rem';

        if (!validateForm()) {
            sign.style.marginTop = '0rem';
            return;
        }


        const response = await axios.post('http://localhost:5000/api/auth/signup', {
            email: formData.email,
            password: formData.password,
            username: formData.username
        })
            .then((response) => {
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {

                setLoading(false);
                setErrors(error.response.data)
            }
            );
    }

    return (
        <div className="form-container">
            <p className="title">Create your account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="input-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="" value={formData.username} onChange={handleInputChange} />
                </div>

                <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="" value={formData.password} onChange={handleInputChange} />

                </div>
                <div className="input-group">
                    <label for="verify_password">Verify your Password</label>
                    <input type="password" name="verify_password" id="verify_password" placeholder="" value={formData.verify_password} onChange={handleInputChange} />
                    {errors.verify_password && <p className="error">{errors.verify_password}</p>}
                    {errors.requiredElementMissing && <p className="error">{errors.requiredElementMissing}</p>}
                </div>
                <button className="sign" >Sign up</button>
            </form>
            <p className="login"  >Already have an account ?
                <a rel="noopener noreferrer" href="/login" className=""> Log in</a>
            </p>
        </div >
    );
}
export default SignupForm;