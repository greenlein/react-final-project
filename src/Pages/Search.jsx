import React, { use } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import poster from "../assets/movie-poster.jpg";
import { Link } from "react-router-dom";
import MovieInfo from "./MovieInfo";
import { useState, useEffect } from "react";
import fakeSearch from "../assets/fake-search.json";
import fakeInfo from "../assets/fake-movie-info.json";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "../assets/API_KEY.js";
import axios from "axios";
import convertRating from "../Components/convertRating.jsx";

function Search() {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  async function fetchSearchData() {
    if (!searchQuery) {
      setSearchData([]);
      return;
    }
    // const searchRes = fakeSearch.Search.filter((item) => item.Type === "movie");

    const { data } = await axios.get(
      `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`,
    );
    const searchRes = data.Search.filter((item) => item.Type === "movie");

    const combinedData = await Promise.all(
      searchRes.map(async (movie) => {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`,
        );
        return { ...movie, ...data };
      }),
    );

    setSearchData(combinedData);
    setLoading(false);
  }
  console.log(searchData);

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="search-header">
            <span>
              <b>Search results:</b>
            </span>
            <select defaultValue="placeholder" className="sort-filter">
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
                new Array(8).fill(0).map((e) => (
                  <div className="loading--wrapper">
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
                    to={MovieInfo}
                    className="card--wrapper"
                    key={movie.imdbID}
                  >
                    <div className="card">
                      <div className="hover-desc">{movie.Plot}</div>
                      <figure className="poster--wrapper">
                        <img src={movie.Poster} alt="" className="poster" />
                      </figure>
                      <div className="card__info">
                        <h3 className="title">{movie.Title}</h3>
                        <div className="year">{movie.Year}</div>
                        <div className="director">
                          <b>Director:</b> {movie.Director}
                        </div>
                        <div className="starring">
                          <b>Starring:</b> {movie.Actors}
                        </div>
                        <div className="genre">
                          <b>Genre:</b> {movie.Genre}
                        </div>
                        <div className="rating">
                          {convertRating(movie.imdbRating)}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
