import Header from "./components/Header/header";
import { Route, Routes } from "react-router";
import Home from "./components/Home/home";
import "./global.css";
import Footer from "./components/footer/Footer";
import Alert from "./components/alert/Alert";
import AboutUs from "./components/about-us/AboutUs";
import Login from "./components/login/Login";
import {
  restaurantsLink,
  aboutUsLink,
  registerLink,
  contactUsLink,
} from "./utility/links";
import Register from "./components/register/Register";
import Restaurants from "./components/restaurants/Restaurants";
import { globalStore } from "./store/globalStore";
import { useEffect } from "react";
import supabase from "./supabase";
import RedirectAuth from "./components/redirect-auth-users/RedirectAuth";
import AddRestaurant from "./components/add-restaurant/AddRestaurant";
import RestaurantDetails from "./components/restaurants/restaurant-details/RestaurantDetails";
function App() {
  const { setUser } = globalStore();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({ ...data.user, email: data.user.email ?? null } as any);
      } else {
        setUser(null);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            ...session.user,
            email: session.user.email ?? null,
          } as any);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [setUser]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={aboutUsLink} element={<AboutUs />} />
        <Route
          path="/login"
          element={
            <RedirectAuth>
              <Login />
            </RedirectAuth>
          }
        />
        <Route path={contactUsLink} element={<div>Contact Page</div>} />
        <Route path={restaurantsLink} element={<Restaurants />} />
        <Route
          path={registerLink}
          element={
            <RedirectAuth>
              <Register />
            </RedirectAuth>
          }
        />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/restaurant/:id/:name" element={<RestaurantDetails />} />
      </Routes>
      <Alert />
      <Footer />
    </>
  );
}

export default App;
