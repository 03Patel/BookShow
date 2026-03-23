import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import './index.css'
import Course from "./components/Course";
import SignUp from "./components/SignUp";


function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/signup" element={<SignUp />} />


      </Routes>
    </>
  );
}
export default App;