import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import AirportTransfers from "./pages/AirportTransfers";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/transfers" element={<AirportTransfers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <WhatsAppFloat />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;