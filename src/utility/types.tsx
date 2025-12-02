export type RestaurantCardType = {
  id: number;
  name: string | null;
  logo: string | null;
  location: {
    name: string | null;
  } | null;
  types_of_food: string[] | null;
  food_names?: string[];
  like: number;
  dislike: number;
};

export type User = {
  email: string;
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
