import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    count === 0 &&
      navigate("/", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 style={{color:'blue'}}>Unauthorized</h1>
        <h1 className="text-center" style={{color:'blue'}}>Redirecting in {count}</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden" style={{color:'blue'}}>Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
