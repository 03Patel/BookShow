import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import './index.css'
import Course from "./components/Course";
import SignUp from "./components/SignUp";
import ContactForm from "./components/Contact";
import AboutSection from "./components/About";


function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutSection />} />


      </Routes>
    </>
  );
}
export default App;