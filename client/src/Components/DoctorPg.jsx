import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DoctorPg = () => {
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/room/stressuser/`
      );
      setUserData(res.data);
      // setUserData([
      //     {username:'Devansh'},{username:'Dev'},{username:'Harshil'}
      // ])
    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      {userData && userData.length > 0 ? (
        <>
          {userData.map((user) => (
            <div className="card m-2" key={user.username}>
              <div className="card-header">{user.username}</div>
              <div className="card-body">
                <p className="card-title">{user.email}</p>
                <button className="btn btn-primary m-1">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={`/room/${user.connect_code}`}
                  >
                    Connect
                  </Link>
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => window.open(user.prompt_csv, "_blank")}
                >
                  View Prompt CSV
                </button>

                <button
                  className="btn btn-primary m-1"
                  onClick={() => {
                    if (user.form_csv) {
                      window.open(user.form_csv, "_blank");
                    } else {
                      toast.error("User hasn't filled out the form");
                    }
                  }}
                >
                  View Form CSV
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h3>No patients</h3>
      )}
    </Layout>
  );
};

export default DoctorPg;
