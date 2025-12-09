import { Button } from "@/components/ui/button";
import type { RestaurantCardType } from "@/utility/types";
import { CookingPot, MapPin, ThumbsDown, ThumbsUp, X } from "lucide-react";
import restaurantsFallbackIcon from "../../../utility/icons.tsx";
import { useNavigate } from "react-router";
type RestourantCardProps = {
  restaurant: RestaurantCardType;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
};

const RestaurantCard = ({
  restaurant,
  showDelete = false,
  onDelete,
}: RestourantCardProps) => {
  const navigate = useNavigate();
  const redirectToRestaurantPage = () => {
    navigate(`/restaurant/${restaurant.id}/${restaurant.name}`);
  };
  const typeFood3 = (foodTypes: string[]) => {
    if (foodTypes && foodTypes.length > 2) {
      return foodTypes.slice(0, 2).join(", ") + ", ...";
    } else if (foodTypes) {
      return foodTypes?.join(", ");
    } else {
      return "";
    }
  };
  return (
    <div
      key={restaurant.id}
      className="border border-neutral rounded-lg w-full h-full flex flex-col shadow-custom relative"
    >
      {showDelete && onDelete && (
        <button
          onClick={() => onDelete(restaurant.id)}
          className="absolute top-2 cursor-pointer right-2 z-20 bg-error hover:bg-error/80 text-white rounded-full p-1.5 transition-colors shadow-lg"
          aria-label="Изтрий ресторант"
        >
          <X size={18} />
        </button>
      )}
      <div className="relative w-full h-[100px] border-b border-neutral">
        <div
          onClick={redirectToRestaurantPage}
          className="absolute cursor-pointer top-7 left-3 w-[85px] h-[85px] z-10 rounded-full bg-base-300"
        >
          {restaurant.logo ? (
            <img
              src={restaurant.logo || ""}
              alt={`Лого на ресторант ${restaurant.name ?? ""}`}
              loading="lazy"
              className="w-full h-full rounded-full object-cover border border-base-300 shadow-business"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border-b rounded-full border-neutral bg-base-200 shadow-business">
              <CookingPot className="stroke-primary " size={50} />
            </div>
          )}
        </div>
        <div className="cursor-pointer" onClick={redirectToRestaurantPage}>
          <div className="size-full bg-secondary">
            {restaurantsFallbackIcon()}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex flex-col-reverse md:flex md:flex-row md:justify-between md:items-center gap-1 mb-1">
          {restaurant.food_names && (
            <p className="text-sm!">{typeFood3(restaurant.food_names)}</p>
          )}
          {restaurant.location?.name && (
            <div className="text-secondary flex gap-1 items-center">
              <MapPin size={16} className="stroke-secondary" />
              <p className="text-sm!">{restaurant.location.name}</p>
            </div>
          )}
        </div>
        <span
          onClick={redirectToRestaurantPage}
          className="flex-1 cursor-pointer text-primary font-bold md:text-lg text-base pt-1 line-clamp-2 min-h-13"
        >
          {restaurant.name}
        </span>
        <div className="flex flex-col items-start gap-1 mt-1">
          <div className="flex gap-2">
            <ThumbsUp
              size={16}
              className="fill-primary stroke-primary mt-0.5"
            />
            <p>({restaurant.like} препоръчват)</p>
          </div>
          <div className="flex gap-2">
            <ThumbsDown
              size={16}
              className="fill-primary stroke-primary mt-0.5"
            />
            <p>({restaurant.dislike} не препоръчват)</p>
          </div>
        </div>
      </div>

      <div className="mt-auto py-4 flex justify-center items-center border-t rounded-b-xl border-neutral">
        <Button className="mr-4" onClick={redirectToRestaurantPage}>
          Виж профил
        </Button>
      </div>
    </div>
  );
};

export default RestaurantCard;
