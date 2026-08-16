import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Pages/Search";
import Navbar from "./Components/Navbar";
import MovieInfo from "./Pages/MovieInfo";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"></Route>
          <Route path="/results" element={<Search />}></Route>
          <Route path="/movie/:id" element={<MovieInfo />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
