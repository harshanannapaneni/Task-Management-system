import React, { useState } from 'react'
import "../css/login.css"
import axios from 'axios'
import { useNavigate } from 'react-router'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/auth/login",{username, password});
            localStorage.setItem('token',response.data.token);
            navigate('/dashboard')
        }
        catch(err){
            alert("Invalid Credential")
        }
    };

    return(
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" 
                            placeholder='Username'
                            className='login-input'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    <input type="password"
                            placeholder='Password'
                            className='login-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className='login-btn'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage