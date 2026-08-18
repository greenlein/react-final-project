import React, { useRef } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import poster from "../assets/movie-poster.jpg";
import { Link } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import filmReel from "../assets/film-reel.png";
import { useState, useEffect } from "react";
import fakeSearch from "../assets/fake-search.json";
import fakeInfo from "../assets/fake-movie-info.json";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "../assets/API_KEY.js";
import axios from "axios";
import convertRating from "../Components/convertRating.jsx";
import popcorn from "../assets/popcorn.png";

function Search() {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");
  const sortRef = useRef("placeholder");
  const [isUnavailable, setIsUnavailable] = useState(false);

  async function fetchSearchData() {
    if (!searchQuery) {
      setSearchData([]);
      return;
    }

    const { data } = await axios.get(
      `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`,
    );
    const searchRes = data.Search.filter((item) => item.Type === "movie");

    const combinedData = await Promise.all(
      searchRes.map(async (movie) => {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`,
        );

        console.log(movie.imdbRating);

        return { ...movie, ...data };
      }),
    );

    if (sortRef.current.value !== "placeholder") {
      sortBy(combinedData);
    } else {
      setSearchData(combinedData);
      setLoading(false);
    }
  }

  useEffect(() => {
    setIsUnavailable(false);
    setLoading(true);
    fetchSearchData();

    const timer = setTimeout(() => {
      setIsUnavailable(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  function sortBy(data) {
    const value = sortRef.current.value;
    const sortedMovies = [...data];

    value === "A_Z" &&
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));

    value === "Z_A" &&
      sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));

    value === "HIGH_LOW" &&
      sortedMovies.sort((a, b) => {
        if (a.imdbRating === "N/A") return 1;
        if (b.imdbRating === "N/A") return -1;
        return b.imdbRating - a.imdbRating;
      });

    value === "LOW_HIGH" &&
      sortedMovies.sort((a, b) => {
        if (a.imdbRating === "N/A") return 1;
        if (b.imdbRating === "N/A") return -1;
        return a.imdbRating - b.imdbRating;
      });

    setSearchData(sortedMovies);
    setLoading(false);
  }

  return (
    <div>
      <div className="container search-container">
        <div className="row">
          <div className="search-header">
            <span>
              <b>Search results:</b>
            </span>
            <select
              ref={sortRef}
              defaultValue="placeholder"
              className="sort-filter"
              onChange={() => sortBy(searchData)}
            >
              <option value="placeholder" disabled>
                Sort By:
              </option>
              <option value="A_Z">Alphabetically: A - Z</option>
              <option value="Z_A">Alphabetically: Z - A</option>
              <option value="HIGH_LOW">Rating: High to Low</option>
              <option value="LOW_HIGH">Rating: Low to High</option>
            </select>
          </div>
          <div className="cards-container">
            <div className="cards">
              {loading &&
                new Array(8).fill(1, 8).map((e) => (
                  <div className="loading--wrapper" key={e}>
                    <div className="card--loading">
                      <figure className="poster--wrapper--loading"></figure>
                      <div className="card__info loading">
                        <h3 className="title loading "></h3>
                        <div className="year loading"></div>
                        <div className="director loading"></div>
                        <div className="starring loading"></div>
                        <div className="genre loading"></div>
                        <div className="rating loading"></div>
                      </div>
                    </div>
                  </div>
                ))}
              {searchData.map((movie) => {
                return (
                  <Link
                    to={`/movie/${movie.imdbID}`}
                    className="card--wrapper no-underline"
                    key={movie.imdbID}
                  >
                    <div className="card">
                      <div className="hover-desc">
                        {movie.Plot !== "N/A"
                          ? movie.Plot
                          : "Plot unavailable!"}
                      </div>
                      <figure className="search-poster--wrapper">
                        <img src={movie.Poster} alt="" className="search-poster" />

                        {isUnavailable && (
                          <div className="poster-unavailable">
                            <span className="unavailable--text">
                              Poster Unavailable!
                            </span>
                            <img
                              src={filmReel}
                              alt=""
                              className="unavailable--img"
                            />
                          </div>
                        )}
                      </figure>
                      <div className="card__info">
                        <h3 className="title card__item">{movie.Title}</h3>
                        <div className="year card__item">{movie.Year}</div>
                        <div className="director card__item">
                          <b>Director:</b> {movie.Director}
                        </div>
                        <div className="starring card__item">
                          <b>Starring:</b> {movie.Actors}
                        </div>
                        <div className="genre card__item">
                          <b>Genre:</b> {movie.Genre}
                        </div>
                        <div className="rating card__item">
                          <b>IMDb Rating:</b> &nbsp; 
                          {convertRating(movie.imdbRating)}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {!searchQuery && (
            <div className="search-now-prompt">
              <figure className="prompt__img--wrapper">
                <img src={popcorn} alt="" className="prompt__img" />
              </figure>
              <h4 className="prompt__text">
                Search any title above to get started.
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
