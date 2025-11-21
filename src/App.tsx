import Header from "./components/header/Header";
import { Route, Routes } from "react-router";
import Home from "./components/Home/home";
import "./global.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/restaurants" element={<div>Restaurants Page</div>} />
      </Routes>
    </>
  );
}

export default App;
