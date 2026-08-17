import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../assets/API_KEY";
import { useParams } from "react-router-dom";
import "./MovieInfo.css";
import fresh from "../assets/fresh.png";
import rotten from "../assets/rotten.png";
import metacritic from "../assets/metacritic.png";
import imdb from "../assets/imdb.png";

function MovieInfo() {
  const [movie, setMovie] = useState({});
  const { imdbId } = useParams();

  async function fetchMovie() {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`,
    );
    setMovie(data);
  }

  useEffect(() => {
    fetchMovie();
  }, [imdbId]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card">
            <figure className="poster--wrapper">
              <img src={movie.Poster} alt="" className="poster" />
            </figure>
            <div className="card__info">
              <div className="title">
                <b>Title:</b> {movie.Title}
              </div>
              <div className="year">
                <b>Year:</b> {movie.Year}
              </div>
              <div className="rated">
                <b>Rated:</b> {movie.Rated}
              </div>
              <div className="released">
                <b>Released:</b> {movie.Released}
              </div>
              <div className="runtime">
                <b>Runtime:</b> {movie.Runtime}
              </div>
              <div className="genre">
                <b>Genre(s):</b> {movie.Genre}
              </div>
              <div className="director">
                <b>Director:</b> {movie.Director}
              </div>
              <div className="writer">
                <b>Writer(s):</b> {movie.Writer}
              </div>
              <div className="actors">
                <b>Starring:</b> {movie.Actors}
              </div>
              <div className="languages">
                <b>Language(s):</b>
                {movie.Languages}
              </div>
              <div className="country">
                <b>Country of Origin:</b> {movie.Country}
              </div>
              <div className="awards">
                <b>Awards:</b> {movie.Awards}
              </div>
              <div className="ratings">
                {movie.Ratings?.[0] && (
                  <div className="imdb">
                    <img className="rating-icon" src={imdb} alt="" />
                    <b>IMDb:</b> {movie.Ratings[0].Value}
                  </div>
                )}

                {movie.Ratings?.[1] && (
                  <div className="tomatoes">
                    {movie.Ratings[1].Value >= "60" ? (
                      <img className="rating-icon" src={fresh} alt="" />
                    ) : (
                      <img className="rating-icon" src={rotten} alt="" />
                    )}
                    <b>Rotten Tomatoes:</b> {movie.Ratings[1].Value}
                  </div>
                )}

                {movie.Ratings?.[2] && (
                  <div className="metacritic">
                    <img className="rating-icon" src={metacritic} alt="" />
                    <b>Metacritic:</b> {movie.Ratings[2].Value}
                  </div>
                )}
              </div>
              <div className="box-office">
                <b>Box-Office:</b> {movie.BoxOffice}
              </div>
            </div>
          </div>
          <div className="plot">
            <b>Plot:</b> {movie.Plot}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
