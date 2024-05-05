import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import Login from "../Components/Login";
const Landing = () => {
  const [auth, setAuth] = useAuth();
  const [isDoctor,setIsDoctor]=useState(false)
  const checkDoc=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/auth/users/me/`)
      if(data.username==='admin')
      setIsDoctor(true)
    } catch (error) {
      console.log(error.message)
      // toast.error('Something went wrong')
    }
  }
  useEffect(()=>{
    checkDoc()
  },[auth])
  return (
    <Layout>
      <div>
        <div className="d-flex flex-wrap align-items-center">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-visit-psychologist-concept_52683-69070.jpg?size=626&ext=jpg&ga=GA1.2.1581494013.1688723703&semt=ais"
            style={{ height: "auto", width: "34vw", marginRight: "" }}
          />
          <img
            src="https://img.freepik.com/free-vector/woman-giving-comfort-support-friend_74855-5301.jpg?size=626&ext=jpg&ga=GA1.2.1581494013.1688723703&semt=ais"
            style={{ height: "auto", width: "38vw", marginRight: "" }}
          />
          {auth && auth.token ? (
            <>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Welcome</h5>
                  <div>
                  <p style={{ color: "blue" }}>
                    Your mental health is a priority. Your happiness is
                    essential. Your self-care is a necessity You deserve to take
                    care of yourself.
                  </p>
                  {isDoctor?(
                    <Link to={"/doctorPg"}>View Patients</Link>
                  ):(
                    <Link to={"/form"}>Click Here to Take a Mental Health Quizz</Link>
                  )}
                  
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Login />
          )}
        </div>
        <h1 style={{ color: "blue", margin: "20px", textAlign: "center" }}>
          Mental Health Thoughts
        </h1>
        <div className="text-center">
          {" "}
          {/* Center the carousel */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            style={{ display: "inline-block" }}
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://blogimage.vantagefit.io/vfitimages/2022/08/21-Men-s-Mental-Health-Quotes-to-Mark-Men-s-Mental-Health-Week-.png"
                  className="d-block mx-auto"
                  style={{ width: "50vw", height: "auto" }}
                  alt="Slide 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="data:image/jpeg;base64,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"
                  className="d-block mx-auto"
                  style={{ width: "50vw", height: "auto" }}
                  alt="Slide 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://uploads-ssl.webflow.com/5f6cc9cd16d59d990c8fca33/63cfe6d4cbc6855b5c009eef_mental-health-quotes.jpg"
                  className="d-block mx-auto"
                  style={{ width: "50vw", height: "auto" }}
                  alt="Slide 3"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
