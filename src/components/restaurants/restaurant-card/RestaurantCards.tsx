"use client";

import { Button } from "@/components/ui/button";
import type { RestaurantCardType } from "@/utility/types";
// import { BusinessCard as BusinessCardType } from "app/api/user-profile/favourite/get/route";
import { CookingPot, MapPin, Star } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";
// import { personalProfileFavourites } from "utility/links";
// import { BusinessServiceFallbackIcon } from "utility/icons";
import restaurantsFallbackIcon from "../../../utility/icons.tsx";
import { useNavigate } from "react-router";

type RestourantCardProps = {
  restaurant: RestaurantCardType;
};

const RestaurantCard = ({ restaurant }: RestourantCardProps) => {
  const navigate = useNavigate();
  const redirectToRestaurantPage = () => {
    navigate(`/restaurant/${restaurant.id}/${restaurant.name}`);
  };

  return (
    <div
      key={restaurant.id}
      className="border border-neutral rounded-lg w-full h-full flex flex-col shadow-custom"
    >
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
              sizes="85px"
              className="rounded-full object-cover border absolute border-base-300 shadow-business"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border-b rounded-full border-neutral bg-base-200 shadow-business">
              <CookingPot className="stroke-primary " size={50} />
            </div>
          )}
        </div>
        <div onClick={redirectToRestaurantPage}>
          <div className="size-full bg-secondary">
            {restaurantsFallbackIcon()}
          </div>
        </div>
        {/* {pathName === personalProfileFavourites && handleRemove ? (
          <Button
            variant="ghost"
            onClick={() =>
              openConfirm(
                "Сигурни ли сте, че искате да премахнете профила?",
                `След като премахнете профилът от секцията любими, той няма да се визуализира повече тук, докато не го маркирате отново като любим.`,
                () => handleRemove(business.id),
                "",
                "Премахни"
              )
            }
            aria-label="Премахване"
            className="bg-base-100 hover:bg-base-100/80 absolute top-1 right-1 size-8 !rounded-full"
          >
            <X className="stroke-error-content size-6" />
          </Button>
        ) : null} */}
      </div>

      <div className="flex-1 p-4">
        <div className="flex flex-col-reverse md:flex md:flex-row md:justify-between md:items-center gap-1 mb-1">
          {restaurant.type_food?.name && (
            <p className="text-sm!">{restaurant.type_food.name}</p>
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
        {/* <p className="mt-1">
          {restaurant.activeServicesCount ?? 0}{" "}
          {`предлаган${restaurant.activeServicesCount === 1 ? "а" : "и"} услуг${
            restaurant.activeServicesCount === 1 ? "а" : "и"
          }`}
        </p> */}
        <div className="flex items-start gap-1 mt-1">
          <Star size={16} className="fill-primary mt-0.5" />
          {/* <p className="text-primary! font-bold">{restaurant.avgRating}</p>
          <p>({restaurant.totalFeedbacksCount} отзива)</p> */}
        </div>
      </div>

      <div className="mt-auto py-4 flex justify-center items-center border-t rounded-b-xl border-neutral">
        <Button className="mr-4" onClick={redirectToRestaurantPage}>
          Виж профил
        </Button>
      </div>
      {/* <DialogComponent
        open={modal.open}
        header={modal.header}
        description={modal.description}
        onOpenChange={modal.onOpenChange}
        onConfirm={modal.onConfirm}
        cancelContent={modal.cancelContent}
        mainActionContent={modal.mainActionContent}
      /> */}
    </div>
  );
};

export default RestaurantCard;
