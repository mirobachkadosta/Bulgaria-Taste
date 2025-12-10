import Header from "./components/header/header";
import { Route, Routes } from "react-router";
import Home from "./components/home/home";
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
import UserProfile from "./components/user-profile/UserProfile";
import ContactUsContent from "./components/contact-us/ContactUs";
import NotFound from "./components/not-found/NotFound";
function App() {
  const { setUser } = globalStore();

  useEffect(() => {
    const fetchUserWithLogo = async (email: string, userId: string) => {
      const { data: userData } = await supabase
        .from("user")
        .select("name, logo")
        .eq("email", email)
        .single();

      setUser({
        id: userId,
        email: email,
        logo: userData?.logo || null,
        name: userData?.name || null,
      });
    };

    supabase.auth.getUser().then(({ data }) => {
      if (data.user && data.user.email) {
        fetchUserWithLogo(data.user.email, data.user.id);
      } else {
        setUser(null);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user && session.user.email) {
          fetchUserWithLogo(session.user.email, session.user.id);
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

        <Route path={contactUsLink} element={<ContactUsContent />} />
        <Route path={restaurantsLink} element={<Restaurants />} />
        <Route
          path={registerLink}
          element={
            <RedirectAuth>
              <Register />
            </RedirectAuth>
          }
        />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/restaurant/:id/:name" element={<RestaurantDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Alert />
      <Footer />
    </>
  );
}

export default App;
