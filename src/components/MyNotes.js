import React, { useContext, useEffect,useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const MyNotes = () => {
  
  const context = useContext(NoteContext);
  const ref = useRef(null);
  const closeModalRef= useRef(null)
  useEffect(() => {
    context.fetchNotes();
  }, [localStorage.getItem("token")]);
  const [note,setNote] = useState({title:"",description:"",tag:""});
  const updateNote = (noteUp) => {
    ref.current.click();
    setNote({_id:noteUp._id,title:noteUp.title,description:noteUp.description,tag:noteUp.tag})
  };
  const notes = useContext(NoteContext).notes;
    console.log(notes)
  const onchange =(e)=>{
     
      setNote({...note,[e.target.name]:e.target.value});
  }
  
  const handleClick=()=>{
        closeModalRef.current.click();
        context.updateNote(note);
  }
  return (
    <>
      <AddNote />
      <h1>hello</h1>
      <button style={{display:"none"}}
        type="button"
        className="btn btn-primary"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  placeholder="title"
                  name="title"
                  value={note.title}
                  onChange={onchange}
                />
                <br />
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                  value={note.description}
                  onChange={onchange}
                />
                <br />
                <input
                  type="text"
                  placeholder="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onchange}
                />
                <br />
                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeModalRef}
              >
                Close
              </button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex my-3 mx-3 flex-wrap">
        {notes.length === 0
          ? " "
          : notes.map((note) => {
              return (
                <NoteItem key={note._id} note={note} updateNote={updateNote} />
              );
            })}
      </div>
    </>
  );
};

export default MyNotes;
