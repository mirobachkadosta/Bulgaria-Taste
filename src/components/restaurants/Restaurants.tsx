"use client";

import { useState, useEffect } from "react";
import type { RestaurantCardType } from "@/utility/types";
import RestaurantCard from "./restaurant-card/RestaurantCards";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { supabase } from "@/supabase/supabase";
import { globalStore } from "@/store/globalStore";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);
  const { setAlertStatus } = globalStore();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data: restaurantsData, error } = await supabase
          .from("restaurants")
          .select(`*, location: locations (name)`);
        if (error) {
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка",
            statusContent:
              "Грешка при зареждане на ресторантите: " + error.message,
          });
          return;
        }

        const { data: foodData, error: foodTypeError } = await supabase
          .from("type_food")
          .select();

        if (foodTypeError) {
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка",
            statusContent: "Грешка при зареждане на типовете кухня",
          });
        }
        const restaurantsWithFoodNames = restaurantsData.map((restaurant) => ({
          ...restaurant,
          food_names: restaurant.types_of_food
            ? restaurant.types_of_food
                .map((id: string) => foodData?.find((ft) => ft.id == id)?.name)
                .filter(Boolean)
            : [],
        }));

        setRestaurants(restaurantsWithFoodNames);
      } catch (err) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent: "Грешка при зареждане на ресторантите: " + err,
        });
        setRestaurants([]);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <main className="full-width-section bg-base-100 lg:pb-24 pb-12">
      <div className="flex flex-col content-container lg:gap-12 lg:pt-12">
        <HeaderSection
          header="Ресторанти"
          subHeader="Регистриралите се ресторанти в нашата платформа"
        />
        {/* {!isMobile && (
        <div className="hidden lg:flex lg:flex-row flex-[3] h-max border-neutral border-1 rounded-2xl">
          <DesktopFilters hasCategories={true} applyFilter={applyFilters} />
        </div>
      )} */}
        {/* <div className="flex-[7]">
        {isMobile && LazyFilterDropdown && (
          <div className="flex justify-between items-center pb-6">
            <LazyFilterDropdown hasCategories applyFilter={applyFilters} />
          </div>
        )} */}
        {restaurants.length ? (
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center">
            В момента няма ресторанти, които може да Ви покажем, на база
            избраните от Вас филтри!
          </p>
        )}
      </div>
    </main>
  );
};

export default Restaurants;
