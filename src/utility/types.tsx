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
