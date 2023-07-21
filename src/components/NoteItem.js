import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = (props) => {
  const context = useContext(NoteContext)  
  const deleteHandle = ()=>{
    context.deleteNote(props.note._id);
  }
  
  return (
    <div className='mx-3' >
      <div className="card" >
     <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.tag}</h6>
    <p className="card-text">{props.note.description}</p>
    <button onClick={deleteHandle}>delete</button>
    <button onClick={()=>{props.updateNote(props.note)}}>update</button>
  </div>
</div>
    </div>
  )
}

export default NoteItem
