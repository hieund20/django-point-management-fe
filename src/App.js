import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./sharedComponents/navbar";
import Footer from "./sharedComponents/footer";
import MyCourses from "./pages/my-courses";
import CourseDetail from "./pages/course-detail";
import InputScore from "./pages/input-scores";
import UserDetail from "./pages/user-detail";
import Forum from "./pages/forum";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* <Route exact path="/"></Route> */}
          <Route path="/my-course" element={<MyCourses />}></Route>
          <Route exact path="/my-course/:id" element={<CourseDetail />}></Route>
          <Route
            exact
            path="/my-course/input-scores/:course_id/user/:user_id"
            element={<InputScore />}
          ></Route>
          <Route exact path="/user-detail/:id" element={<UserDetail />}></Route>
          <Route exact path="/forum" element={<Forum />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
