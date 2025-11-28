import Header from "./components/header/Header";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import "./global.css";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import {
  restaurantsLink,
  aboutUsLink,
  registerLink,
  contactUsLink,
} from "./utility/links";
import Register from "./components/register/Register";
import Restaurants from "./components/restaurants/Restaurants";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={aboutUsLink}
          element={
            <div>
              <AboutUs />
            </div>
          }
        />
        <Route path={contactUsLink} element={<div>Contact Page</div>} />
        <Route path={restaurantsLink} element={<Restaurants />} />
        <Route path={registerLink} element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
