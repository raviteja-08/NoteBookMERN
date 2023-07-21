import React, { useEffect } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  useEffect(()=>{},[localStorage.getItem("token")])
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NoteBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
           
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname==='/'?"active":""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/About'?"Active":""}`} to="/Notes">
                  Notes
                </Link>
              </li> */}
            </ul>
              
              { !localStorage.getItem("token")? <>
                    <Link className="btn btn-outline-primary mx-2" to='/login' >
                        login
                    </Link>
                    <Link className="btn btn-primary" to='/signup'>
                      signup
                    </Link>
              </>
               : <button className="btn btn-danger" onClick={handleLogout}>logout</button>
              }
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
