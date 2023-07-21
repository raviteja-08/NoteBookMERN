import React, { useEffect } from 'react'
import MyNotes from '../components/MyNotes'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    
    if(!localStorage.getItem("token")){
        navigate('/login');
    }

  },[localStorage.getItem('token')])

  
  return (
    <div>
      {localStorage.getItem("token") && <MyNotes/>}
      
    </div>
  )
}

export default Home
