import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
const Header = () => {
  const auth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(auth[0].token));
  const handleLogout=()=>{
    localStorage.removeItem("auth")
    toast.success('Logged out')
    window.location.reload()
  }
  const handleTurtle=async()=>{
    try {
      await axios.get(`${process.env.REACT_APP_API}/turtle`)
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error.message)
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            MindfulMate
          </NavLink>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Zen Corner
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/breathingGame">
                      Meditate and Unwind 
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={"/speak"}>
                      Rescue Sessions
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/peerchat">
                  Peer Grps
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/chatPg">
                  AI Chatbot
                </NavLink>
              </li>
              {auth && auth[0].token? (
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
