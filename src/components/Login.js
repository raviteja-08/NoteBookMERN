import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [user,setUser]=useState({email:"",password:""});
    const change=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
  const submitHandle=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:3221/api/auth/login', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
           },
           body: JSON.stringify(user)
           
            
        });
        const json = await response.json();
        if(json.success===true){
            console.log(json.authToken);
            localStorage.setItem("token",json.authToken);
            navigate('/');
            
        }
        else{
            alert("incorrect details");
        }
        setUser({email:"",password:""});
  }  
  return (
    <div className='container' style={{width:"50%"}}>
      <form onSubmit={submitHandle}>
        <div className="form-group">
            <label style={{textAlign:"left"}} htmlFor="email">Email address</label>
            <input type="email" className="form-control" name="email" id="email" onChange={change} value={user.email} aria-describedby="emailHelp" placeholder="Enter email"/>
            
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={change} value={user.password} placeholder="Password"/>
        </div>
        
        <button type="submit" className="btn  my-3 btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
