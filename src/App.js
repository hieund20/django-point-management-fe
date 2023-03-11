import "./App.scss";
// import RoutesRoot from "./config/routes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Navbar from "./sharedComponents/navbar";
import Footer from "./sharedComponents/footer";
import MyCourses from "./pages/my-courses";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/my-course" element={<MyCourses />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
