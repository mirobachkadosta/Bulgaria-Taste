import { useState, useEffect } from "react";
import type { RestaurantCardType, Location, FoodType } from "@/utility/types";
import RestaurantCard from "./restaurant-card/RestaurantCards";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { supabase } from "@/supabase/supabase";
import { globalStore } from "@/store/globalStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<RestaurantCardType[]>(
    []
  );
  const [locations, setLocations] = useState<Location[]>([]);
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedFoodType, setSelectedFoodType] = useState<string>("");
  const { setAlertStatus } = globalStore();

  useEffect(() => {
    const fetchData = async () => {
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

        const { data: locationsData, error: locationsError } = await supabase
          .from("locations")
          .select();

        if (locationsError) {
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка",
            statusContent: "Грешка при зареждане на локациите",
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

        setAllRestaurants(restaurantsWithFoodNames);
        setRestaurants(restaurantsWithFoodNames);
        setFoodTypes(foodData || []);
        setLocations(locationsData || []);
      } catch (err) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent: "Грешка при зареждане на ресторантите: " + err,
        });
        setRestaurants([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allRestaurants];

    if (selectedLocation && selectedLocation !== "all") {
      filtered = filtered.filter(
        (restaurant) => String(restaurant.location_id) === selectedLocation
      );
    }

    if (selectedFoodType && selectedFoodType !== "all") {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.types_of_food &&
          restaurant.types_of_food.some(
            (foodId: string | number) => String(foodId) === selectedFoodType
          )
      );
    }

    setRestaurants(filtered);
  }, [selectedLocation, selectedFoodType, allRestaurants]);

  return (
    <main className="full-width-section bg-base-100 lg:pb-24 pb-12">
      <div className="flex flex-col content-container gap-12 lg:pt-12">
        <HeaderSection
          header="Ресторанти"
          subHeader="Регистриралите се ресторанти в нашата платформа"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <label className="block text-primary text-sm font-medium mb-2">
                Локация
              </label>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="bg-base-200 text-secondary border-primary">
                  <SelectValue placeholder="Всички локации" />
                </SelectTrigger>
                <SelectContent className="bg-base-200 text-secondary border-primary max-h-[300px] overflow-y-auto">
                  <SelectItem className="hover:bg-base-200/80" value="all">
                    Всички локации
                  </SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={String(location.id)}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-secondary">
                Тип кухня
              </label>
              <Select
                value={selectedFoodType}
                onValueChange={setSelectedFoodType}
              >
                <SelectTrigger className="bg-base-200 text-secondary border-primary">
                  <SelectValue placeholder="Всички типове кухня" />
                </SelectTrigger>
                <SelectContent className="bg-base-200 text-secondary border-primary max-h-[300px] overflow-y-auto">
                  <SelectItem value="all">Всички типове кухня</SelectItem>
                  {foodTypes.map((foodType) => (
                    <SelectItem
                      className="hover:bg-base-200/80"
                      key={foodType.id}
                      value={String(foodType.id)}
                    >
                      {foodType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!selectedLocation && !selectedFoodType}
              onClick={() => {
                setSelectedLocation("");
                setSelectedFoodType("");
              }}
              variant="outline"
              className="border-primary text-secondary hover:bg-base-200"
            >
              Изчисти филтрите
            </Button>
          </div>
        </div>

        {restaurants.length ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center">
            В момента няма ресторанти, които може да Ви покажем.
          </p>
        )}
      </div>
    </main>
  );
};

export default Restaurants;
