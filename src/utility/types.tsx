export type RestaurantCardType = {
  id: number;
  name: string | null;
  logo: string | null;
  location: {
    name: string | null;
  } | null;
  type_food: {
    name: string | null;
  } | null;
};
