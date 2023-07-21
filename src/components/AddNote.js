import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';


const AddNote = () => {
    let context = useContext(NoteContext);
    let [note,setNote] = useState({title:"",description:"",tag:""});
    
    const onchange =(e)=>{
       
        setNote({...note,[e.target.name]:e.target.value});
    }
    const sumbitHandle=(e)=>{
        e.preventDefault();
       
        context.insertNote(note);
        setNote({title:"",description:"",tag:""})
    }
  return (
   
   
      <form >
          <input type="text" placeholder='title' name='title'  value={note.title} onChange={onchange} /> 
          <br />
           <input type="text" placeholder='description' name='description'  value={note.description} onChange={onchange} />
          <br />
          <input type="text" placeholder='tag' name='tag'  value={note.tag} onChange={onchange} />
          <br />
          <button onClick={sumbitHandle}>Add Note</button>
      </form> 
    
  )
}

export default AddNote
