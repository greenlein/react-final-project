import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../assets/API_KEY";
import "./Home.css";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [poster, setPoster] = useState("");

  async function createPoster() {
    // Pull random movie title from https://rapidapi.com/sathishluvsatz/api/random-movie-api2
    const options = {
      method: "GET",
      url: "https://random-movie-api2.p.rapidapi.com/api/random-movie",
      headers: {
        "x-rapidapi-key": "868ac3a94fmshaa6ef3151fc0964p1c1042jsn72d75e25c5cd",
        "x-rapidapi-host": "random-movie-api2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      //Get poster from OMDb
      const { data } = await axios.get(
        `http://www.omdbapi.com/?t=${response.data.movie}&apikey=${API_KEY}`,
      );

      const img = new Image();
      img.src = data.Poster;
      img.onload = () => setPoster(data.Poster);
      img.onerror = () => createPoster();
    } catch (error) {
      console.error(error);
      createPoster();
    }
  }

  useEffect(() => {
    if (!poster) {
      createPoster();
    }
  }, []);

  return (
    <>
      <div className="container landing-container">
        <div className="row">
          {poster && (
            <div className="landing">
              <div className="landing__info">
                <h1 className="landing__info--title">
                  Your #1 source for all{" "}
                  <span className="text--accent">film information.</span>
                </h1>
                <button
                  className="landing__info--btn"
                  onClick={() => navigate("/results")}
                >
                  Browse Now
                </button>
              </div>
              <figure className="landing__img--wrapper">
                <img src={poster} alt="" className="landing__img" />
              </figure>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
