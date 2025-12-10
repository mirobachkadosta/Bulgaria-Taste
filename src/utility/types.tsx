export type RestaurantCardType = {
  id: number;
  name: string;
  logo: string | null;
  images: string[] | null;
  location: {
    name: string;
  } | null;
  location_id: string | null;
  types_of_food: string[] | null;
  food_names?: string[];
  creator_email: string | null;
  like: number;
  dislike: number;
};

export type User = {
  id: string;
  email: string;
  logo: string | null;
  name?: string | null;
};

export type AlertStatusType = {
  status: "error" | "success";
  statusHeader: string;
  statusContent?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export type Location = {
  id: number;
  name: string;
};

export type FoodType = {
  id: number;
  name: string;
};
