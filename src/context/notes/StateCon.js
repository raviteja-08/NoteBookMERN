import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";


const StateCon =(props)=>{

 const host = "http://localhost:3221"

const [notes,setNotes]=useState([])
useEffect(()=>{

},[localStorage.getItem("token")])
 
const fetchNotes = async()=>{
   let data="";
   const url = host+"/api/notes/fetchallnotes"
   
   const response = await fetch('http://localhost:3221/api/notes/fetchallnotes', {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       "auth-token":localStorage.getItem("token")
      }
      // body data type must match "Content-Type" header
    });
    const result = await response.json()
    
    setNotes(result);
}

const insertNote =async(note)=>{
   const url =`http://localhost:3221/api/notes/addnote`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
      
    },
    body: JSON.stringify(note) // body data type must match "Content-Type" header
  });
  
 
  fetchNotes();
   
}

const deleteNote = async(id)=>{
     
   const url = `http://localhost:3221/api/notes/delete/${id}`;
   const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")

    },
    // body data type must match "Content-Type" header
  });
  const res= await response.json(); 
  
   let notess = notes.filter((note)=>{return note._id!==id})
   
   setNotes(notess)
   
}
const updateNote = async(note)=>{
  const url =`http://localhost:3221/api/notes/updatenote/${note._id}`
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
      
    },
    body: JSON.stringify(note), // body data type must match "Content-Type" header
  });
  
  
  fetchNotes();
}

return(
 
   <NoteContext.Provider value={{notes,insertNote,deleteNote,fetchNotes,updateNote}}>
       {props.children}
   </NoteContext.Provider>
)
}




export default StateCon;


