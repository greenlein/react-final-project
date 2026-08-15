import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Pages/Search";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"></Route>
          <Route path="/results" element={<Search />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
