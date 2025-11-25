import Header from "./components/header/Header";
import { Route, Routes } from "react-router";
import Home from "./components/Home/home";
import "./global.css";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import {
  restaurantsLink,
  aboutUsLink,
  registerLink,
  contactUsLink,
} from "./utility/links";
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
        <Route path={restaurantsLink} element={<div>Restaurants Page</div>} />
        <Route path={registerLink} element={<div>Register Page</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
