import React, { useState } from "react";
import {json, Navigate, useNavigate} from "react-router-dom";
import { API_URL } from '../lib/config';
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const auth = localStorage.getItem("user");
        if(!auth){
            let result=await fetch(`${API_URL}/User/signIn`,{
                method:'post',
                body:JSON.stringify({email,password:password.value}),
                headers:{
                    'content-type':'application/json' 
                },
                crossDomain:true,
                mode:'cors'
            })
            result= await result.json();
            localStorage.setItem('user',result.user.id)
            localStorage.setItem('token',result.token)
            props.setAuth(localStorage.getItem("user"));
            // navigate("/")
        }
    }

    
    

    return (
        <div className="auth-login-container">
            <h2>Login</h2>
            <form className="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" >Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}