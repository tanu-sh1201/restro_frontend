import React, { useState } from "react";
import { API_URL } from '../lib/config';
import {json, useNavigate} from "react-router-dom";
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [contact,setConatct]=useState('');
    const [address,setaddress]=useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if((name && email && password.value))
        {
            let result = await fetch(`${API_URL}/User/signUp`,{
                method: 'post',
                body: JSON.stringify({ name, email, password:password.value,contact,address }),
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                crossDomain:true,
                mode:'cors'
            });
            result = await result.json();

            
            if(result.message=='User already exist, Please login')
            {
                alert("User already exists, Please login")
            }
            else{
                localStorage.setItem("user", result.user.id)
                localStorage.setItem("token",result.token)
                navigate("view")
            }
            
        }
        else{
            alert("Please provide all details")
        }
        
        
    }


    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
           
            <input value={name} onChange={(e) => setName(e.target.value)}type="name" placeholder="Your Name" id="name" name="name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            
            <label htmlFor="contact">Phone Number</label>
            <input value={contact} onChange={(e) => setConatct(e.target.value)} type="Digit" placeholder="10 Digit Number " id="contact" name="contact" />
            <label htmlFor="address">Address</label>
            <input value={address} onChange={(e) => setaddress(e.target.value)} type="address" placeholder="Your Address" id="address" name="address" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => {setPass(e.target.value)}} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

