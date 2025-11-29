import Header from "./components/header/Header";
import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
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
function App() {
  const setUser = globalStore((state) => state.setUser);

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
        <Route path="/login" element={<Login />} />
        <Route path={contactUsLink} element={<div>Contact Page</div>} />
        <Route path={restaurantsLink} element={<Restaurants />} />
        <Route path={registerLink} element={<Register />} />
      </Routes>
      <Alert />
      <Footer />
    </>
  );
}

export default App;
