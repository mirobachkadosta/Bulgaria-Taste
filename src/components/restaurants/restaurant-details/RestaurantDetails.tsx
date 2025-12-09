import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type {
  FoodType,
  RestaurantCardType,
  User,
} from "../../../utility/types";
import { supabase } from "../../../supabase/supabase";
import { globalStore } from "@/store/globalStore";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantCardType | null>(null);
  const [foodNames, setFoodNames] = useState<string[]>([]);
  const { setIsLoading, user, setAlertStatus } = globalStore();
  const currentUser = user as User;
  const [actionMade, setActionMade] = useState(false);
  useEffect(() => {
    const fetchRestaurant = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) {
        setRestaurant(data);
        if (
          data.types_of_food &&
          Array.isArray(data.types_of_food) &&
          data.types_of_food.length > 0
        ) {
          const { data: foodData, error: foodError } = await supabase
            .from("type_food")
            .select();
          if (!foodError && foodData) {
            const names = data.types_of_food
              .map(
                (id: string) =>
                  foodData.find((ft: FoodType) => ft.id == Number(id))?.name
              )
              .filter(Boolean);
            setFoodNames(names);
          }
        }
      }
      setIsLoading(false);
      setIsLoading(false);
    };
    fetchRestaurant();
  }, [id, setIsLoading]);

  const handleLike = async () => {
    if (!restaurant) return;

    const { error } = await supabase
      .from("restaurants")
      .upsert({ id: restaurant.id, like: restaurant.like + 1 })
      .select();

    if (error) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Грешка при харесване на ресторанта",
      });
      return;
    }

    setActionMade(true);
    setRestaurant({
      ...restaurant,
      like: restaurant.like + 1,
    });
  };

  const handleDislike = async () => {
    if (!restaurant) return;

    const { error } = await supabase
      .from("restaurants")
      .upsert({ id: restaurant.id, dislike: restaurant.dislike + 1 })
      .select();

    if (error) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Грешка при нехаресване на ресторанта",
      });

      return;
    }
    setActionMade(true);
    setRestaurant({
      ...restaurant,
      dislike: restaurant.dislike + 1,
    });
  };

  return (
    <main className="full-width-section bg-base-200 py-12">
      <div className="p-6 max-w-2xl mx-auto rounded-xl bg-base-100 shadow-md flex flex-col items-center">
        {restaurant?.logo && (
          <img
            src={restaurant.logo}
            alt={restaurant.name || "Logo"}
            className="w-32 h-32 object-cover mb-4 rounded-full"
          />
        )}
        <h2 className="text-2xl font-bold mb-2">{restaurant?.name}</h2>
        <p className="mb-2">Location: {restaurant?.location?.name}</p>
        <p className="mb-2">
          Types of food: {foodNames.length ? foodNames.join(", ") : "-"}
        </p>
        <div>
          {restaurant?.images && restaurant.images.length > 0 && (
            <Carousel className="w-80 h-60 my-4">
              <CarouselContent>
                {restaurant.images.map((imgUrl, index) => (
                  <CarouselItem key={index} className="w-80 h-60">
                    <img
                      src={imgUrl}
                      alt={`Restaurant Image ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100" />
            </Carousel>
          )}
        </div>
        <div className="flex gap-4 mb-4 text-primary">
          <span className="flex gap-2 items-center">
            <ThumbsUp size={16} /> Likes: {restaurant?.like}
          </span>
          <span className="flex gap-2 items-center">
            <ThumbsDown size={16} /> Dislikes: {restaurant?.dislike}
          </span>
        </div>
        {currentUser && currentUser?.email !== restaurant?.creator_email ? (
          <div className="flex gap-4 mt-4">
            <Button
              disabled={actionMade}
              onClick={() => handleLike()}
              className="px-4 py-2 bg-primary text-primary-content rounded flex items-center gap-2"
            >
              <ThumbsUp size={16} /> <span>Харесвам</span>
            </Button>
            <Button
              disabled={actionMade}
              onClick={() => handleDislike()}
              className="px-4 py-2 bg-primary text-primary-content rounded flex items-center gap-2"
            >
              <ThumbsDown size={16} /> <span>Не харесвам</span>
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
