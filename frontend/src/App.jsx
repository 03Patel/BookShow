import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import './index.css'
import Course from "./components/Course";
import SignUp from "./components/SignUp";
import ContactForm from "./components/Contact";
import AboutSection from "./components/About";
import { Toaster } from 'react-hot-toast';
import BookReceipt from "./components/BookRec";
import BookDetails from "./components/BookDetails";
import Checkout from "./components/CheckOut";


function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/about" element={<AboutSection />} />\
        <Route path="/BookReceipt/:id" element={<BookReceipt />} />
        <Route path="/Details/:id" element={<BookDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />


      </Routes>
    </>
  );
}
export default App;