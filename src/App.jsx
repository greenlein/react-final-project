import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Navbar from "./Components/Navbar";
import MovieInfo from "./Pages/MovieInfo";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/:imdbId" element={<MovieInfo />}></Route>
          <Route path="/results" element={<Search />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
