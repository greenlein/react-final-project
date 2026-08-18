import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../assets/OMDB_API_KEY";
import { useParams } from "react-router-dom";
import "./MovieInfo.css";
import fresh from "/fresh.png";
import rotten from "/rotten.png";
import metacritic from "/metacritic.png";
import imdb from "/imdb.png";

function MovieInfo() {
  const [movie, setMovie] = useState({});
  const { imdbId } = useParams();

  async function fetchMovie() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`,
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
          <div className="movie-card">
            <figure className="poster--wrapper">
              <img src={movie.Poster} alt="" className="poster" />
            </figure>
            <div className="movie__info">
              <div className="title info__item">
                <b>Title:</b> {movie.Title}
              </div>
              <div className="year info__item">
                <b>Year:</b> {movie.Year}
              </div>
              <div className="rated info__item">
                <b>Rated:</b> {movie.Rated}
              </div>
              <div className="released info__item">
                <b>Released:</b> {movie.Released}
              </div>
              <div className="runtime info__item">
                <b>Runtime:</b> {movie.Runtime}
              </div>
              <div className="genre info__item">
                <b>Genre(s):</b> {movie.Genre}
              </div>
              <div className="director info__item">
                <b>Director:</b> {movie.Director}
              </div>
              <div className="writer info__item">
                <b>Writer(s):</b> {movie.Writer}
              </div>
              <div className="actors info__item">
                <b>Starring:</b> {movie.Actors}
              </div>
              <div className="languages info__item">
                <b>Language(s):</b>
                {movie.Languages}
              </div>
              <div className="country info__item">
                <b>Country of Origin:</b> {movie.Country}
              </div>
              <div className="awards info__item">
                <b>Awards:</b> {movie.Awards}
              </div>
              <div className="box-office info__item">
                <b>Box-Office:</b> {movie.BoxOffice}
              </div>
            </div>
            <div className="ratings">
              {movie.Ratings?.[0] && (
                <div className="imdb rating">
                  <img className="rating-icon" src={imdb} alt="" />
                  <b>IMDb: &nbsp;</b> {movie.Ratings[0].Value}
                </div>
              )}

              {movie.Ratings?.[1] && (
                <div className="tomatoes rating">
                  {movie.Ratings[1].Value >= "60" ? (
                    <img className="rating-icon" src={fresh} alt="" />
                  ) : (
                    <img className="rating-icon" src={rotten} alt="" />
                  )}
                  <b>Rotten Tomatoes: &nbsp;</b> {movie.Ratings[1].Value}
                </div>
              )}

              {movie.Ratings?.[2] && (
                <div className="metacritic rating">
                  <img className="rating-icon" src={metacritic} alt="" />
                  <b>Metacritic: &nbsp;</b> {movie.Ratings[2].Value}
                </div>
              )}
            </div>
          </div>
          <div className="plot info__item">
            <b>Plot:</b> {movie.Plot}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
