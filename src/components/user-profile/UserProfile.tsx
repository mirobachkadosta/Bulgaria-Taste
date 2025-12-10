import { useState, useEffect } from "react";
import type { RestaurantCardType } from "@/utility/types";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { supabase } from "@/supabase/supabase";
import { globalStore } from "@/store/globalStore";
import RestaurantCard from "../restaurants/restaurant-card/RestaurantCards";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateImage, uploadToSupabase } from "@/utility/helpers";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function UserProfile() {
  const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);
  const [userName, setUserName] = useState("");
  const [userLogo, setUserLogo] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [deleteRestaurantId, setDeleteRestaurantId] = useState<number | null>(
    null
  );
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const { setAlertStatus, user, isLoading, setIsLoading } = globalStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        return;
      }

      try {
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("name, logo")
          .eq("email", user.email)
          .single();

        if (userError) {
        } else if (userData) {
          setUserName(userData.name || "");
          setUserLogo(userData.logo || "");
        }
      } catch (err) {}
    };

    const fetchUserRestaurants = async () => {
      if (!user?.email) {
        return;
      }

      try {
        const { data: restaurantsData, error } = await supabase
          .from("restaurants")
          .select(`*, location: locations (name)`)
          .eq("creator_email", user.email);

        if (error) {
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка",
            statusContent:
              "Грешка при зареждане на вашите ресторанти: " + error.message,
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
          statusContent: "Грешка при зареждане на вашите ресторанти: " + err,
        });
        setRestaurants([]);
      }
    };

    fetchUserData();
    fetchUserRestaurants();
  }, [user]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const error = validateImage(file);
      if (error) {
        setAlertStatus({
          status: "error",
          statusHeader: "Проблем при качване на лого",
          statusContent: error,
        });
        setLogoFile(null);
      } else {
        setLogoFile(file);
      }
    }
  };

  const handleButtonClick = () => {
    document
      .querySelector<HTMLInputElement>('[data-testid="profile-file-input"]')
      ?.click();
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      let logoUrl = userLogo;

      if (logoFile) {
        const ext = logoFile.name.split(".").pop();
        const logoPath = `logos/${logoFile.name
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_.-]/g, "")}-${Date.now()}.${ext}`;
        try {
          logoUrl = await uploadToSupabase(logoFile, logoPath);
        } catch (error: any) {
          setIsLoading(false);
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка при качване на логото.",
            statusContent: error.message,
          });
          return;
        }
      }

      const { error: updateError } = await supabase
        .from("user")
        .update({
          name: userName,
          logo: logoUrl,
        })
        .eq("email", user?.email);

      if (updateError) {
        setIsLoading(false);
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка при актуализиране на профила.",
          statusContent: updateError.message,
        });
        return;
      }

      setUserLogo(logoUrl);
      setLogoFile(null);

      if (user) {
        globalStore.setState({
          user: {
            ...user,
            name: userName,
            logo: logoUrl,
          },
        });
      }

      setIsLoading(false);
      setAlertStatus({
        status: "success",
        statusHeader: "Профилът беше актуализиран успешно!",
      });
    } catch (err) {
      setIsLoading(false);
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка при актуализиране на профила.",
        statusContent: String(err),
      });
    }
  };

  const handleDeleteRestaurant = async () => {
    if (!deleteRestaurantId) return;

    try {
      const { error } = await supabase
        .from("restaurants")
        .delete()
        .eq("id", deleteRestaurantId);

      if (error) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent: "Грешка при изтриване на ресторанта: " + error.message,
        });
        return;
      }

      setAlertStatus({
        status: "success",
        statusHeader: "Успех",
        statusContent: "Ресторантът беше изтрит успешно!",
      });

      setRestaurants(restaurants.filter((r) => r.id !== deleteRestaurantId));
      setDeleteRestaurantId(null);
    } catch (err) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Грешка при изтриване на ресторанта: " + err,
      });
    }
  };

  const handleDeleteUser = async () => {
    const email = user?.email;
    if (!email) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Имейлът е задължителен за изтриване на потребител.",
      });
      return;
    }

    setIsLoading(true);
    setShowDeleteUserDialog(false);
    try {
      const { error: restaurantsError } = await supabase
        .from("restaurants")
        .delete()
        .eq("creator_email", email);

      if (restaurantsError) {
        setIsLoading(false);
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent:
            "Грешка при изтриване на ресторантите: " + restaurantsError.message,
        });
        return;
      }

      const { error: userTableError } = await supabase
        .from("user")
        .delete()
        .eq("email", email);

      if (userTableError) {
        setIsLoading(false);
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent:
            "Грешка при изтриване от таблица user: " + userTableError.message,
        });
        return;
      }

      const { error: authError } = await supabase.rpc("delete_user");

      if (authError) {
        setIsLoading(false);
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent:
            "Грешка при изтриване на акаунта: " + authError.message,
        });
        return;
      }

      setIsLoading(false);
      setAlertStatus({
        status: "success",
        statusHeader: "Успех",
        statusContent:
          "Потребителят и всички негови ресторанти бяха изтрити успешно!",
      });

      await supabase.auth.signOut();
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Грешка при изтриване на потребителя: " + err,
      });
    }
  };

  return (
    <main className="full-width-section bg-base-100 lg:pb-24 pb-12">
      <div className="flex flex-col content-container lg:gap-12 lg:pt-12">
        <HeaderSection header="Моят профил" />

        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
          <div className="flex flex-col gap-4 items-center">
            {logoFile || userLogo ? (
              <div className="relative w-[100px] h-[100px]">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={logoFile ? URL.createObjectURL(logoFile) : userLogo}
                  alt="лого на потребителя"
                />
              </div>
            ) : (
              <div className="w-[100px] h-[100px] rounded-full bg-base-200 border-2 border-dashed border-primary flex items-center justify-center">
                <span className="text-primary text-xs text-center">
                  Без лого
                </span>
              </div>
            )}
            <Button
              className="text-accent"
              variant={"link"}
              type="button"
              aria-label="Прикачете снимка за лого"
              data-testid="profile-add-logo-button"
              onClick={handleButtonClick}
            >
              {logoFile || userLogo ? "Промени снимка" : "Прикачи снимка"}
            </Button>
            <input
              type="file"
              accept="image/jpeg,image/png"
              hidden
              data-testid="profile-file-input"
              onChange={handleLogoChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-primary text-sm font-medium">Име</label>
              <Input
                type="text"
                placeholder="Име"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border-primary border rounded-lg placeholder:text-secondary/50 text-primary"
              />
            </div>

            <div>
              <label className="text-primary text-sm font-medium">Имейл</label>
              <Input
                type="email"
                placeholder="Имейл"
                value={user?.email || ""}
                disabled
                className="border-primary border rounded-lg placeholder:text-secondary/50 text-primary opacity-60 cursor-not-allowed"
              />
            </div>

            <Button
              type="button"
              onClick={handleUpdateProfile}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Актуализиране..." : "Актуализирай профил"}
            </Button>
            <Button
              type="button"
              onClick={() => setShowDeleteUserDialog(true)}
              className="text-error-content bg-error"
              disabled={isLoading}
            >
              {isLoading ? "Изтриване..." : "Изтрий профил"}
            </Button>
          </div>
        </div>

        <HeaderSection header="Моите ресторанти" />
        {restaurants.length ? (
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                showDelete={true}
                onDelete={(id) => setDeleteRestaurantId(id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">
            Все още не сте добавили ресторанти в нашата платформа.
          </p>
        )}
      </div>

      <Dialog
        open={deleteRestaurantId !== null}
        onOpenChange={(open) => !open && setDeleteRestaurantId(null)}
      >
        <DialogContent className="bg-base-100">
          <DialogHeader>
            <DialogTitle>Потвърждение за изтриване</DialogTitle>
            <DialogDescription>
              Сигурни ли сте, че искате да изтриете този ресторант? Това
              действие е необратимо.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteRestaurantId(null)}
            >
              Отказ
            </Button>
            <Button
              className="text-error-content bg-error hover:bg-error/90"
              onClick={handleDeleteRestaurant}
            >
              Изтрий
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDeleteUserDialog}
        onOpenChange={setShowDeleteUserDialog}
      >
        <DialogContent className="bg-base-100">
          <DialogHeader>
            <DialogTitle>Изтриване на профил</DialogTitle>
            <DialogDescription>
              Сигурни ли сте, че искате да изтриете профила си? Това ще изтрие
              всички ваши ресторанти и данни. Това действие е необратимо.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteUserDialog(false)}
            >
              Отказ
            </Button>
            <Button
              className="text-error-content bg-error hover:bg-error/90"
              onClick={handleDeleteUser}
              disabled={isLoading}
            >
              Изтрий профил
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
