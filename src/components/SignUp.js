import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [data,setData] = useState({name:"",email:"",password:""}); 
  const change =(e)=>{
         setData({...data,[e.target.name]:e.target.value});
  } 
  const navigate = useNavigate();
  const submitHandle=async(e)=>{
       e.preventDefault();

       let response = await fetch("http://localhost:3221/api/auth/createUser",{
          method:"POST",
          headers:{
            "Content-Type": "application/json"

          },
          body:JSON.stringify(data)

       })

       const json =await response.json();
       if(json.success){
         navigate('/login');

         alert("login to proceed further");
       }
       else{
         alert(json.message);
       }
       setData({name:"",email:"",password:""});
  }
  return (
    <div>
      <div className='container' style={{width:"50%"}}>
      <form onSubmit={submitHandle}>
        <div className="form-group">
            <label style={{textAlign:"left"}} htmlFor="email">Email address</label>
            <input type="email" className="form-control" name="email" id="email" onChange={change} value={data.email} aria-describedby="emailHelp" placeholder="Enter email"/>
            
        </div>
        <div className="form-group">
            <label style={{textAlign:"left"}} htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" id="name" onChange={change} value={data.name}  placeholder="Enter Name"/>
            
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={change} value={data.password} placeholder="Password"/>
        </div>
        
        <button type="submit" className="btn  my-3 btn-primary">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default SignUp
