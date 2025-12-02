import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { supabase } from "../../supabase/supabase";
import type { Location, FoodType } from "@/utility/types";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { globalStore } from "@/store/globalStore";
import { Button } from "../ui/button";

const AddRestaurant: React.FC = () => {
  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState<string>("");
  const [foodTypeIds, setFoodTypeIds] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const { isLoading, setIsLoading } = globalStore();
  const { setAlertStatus } = globalStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: locationsData, error: locationsError } = await supabase
          .from("locations")
          .select();
        if (locationsError) throw locationsError;
        setLocations(locationsData || []);

        const { data: foodTypesData, error: foodTypesError } = await supabase
          .from("type_food")
          .select();
        if (foodTypesError) throw foodTypesError;
        setFoodTypes(foodTypesData || []);
      } catch (err: any) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent:
            "Грешка при зареждане на данни за типове храна и локация:" +
            err.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !locationId || foodTypeIds.length === 0) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Всички полета са задължителни.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { error: insertError } = await supabase.from("restaurants").insert([
        {
          name,
          location_id: Number(locationId),
          types_of_food: foodTypeIds.map(Number),
          creator_email: globalStore().user?.email,
        },
      ]);
      if (insertError) throw insertError;
      setAlertStatus({
        status: "success",
        statusHeader: "Успех",
        statusContent: "Ресторантът беше добавен успешно!",
      });
      setName("");
      setLocationId("");
      setFoodTypeIds([]);
    } catch (err: any) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Неуспешно добавяне на ресторант: " + err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="full-width-section bg-base-200 pb-12">
      <div className="content-container mx-auto mt-10 p-6">
        <HeaderSection header="Добавете вашият ресторант" />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-primary text-base">Име на ресторанта</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Въведете име на ресторанта"
              className="text-secondary placeholder:text-secondary/50"
              required
            />
          </div>
          <div>
            <label className="text-primary text-base">Местоположение</label>
            <select
              className="flex h-9 w-full text-secondary rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              required
            >
              <option className="text-secondary/50" value="" disabled>
                Изберете местоположение
              </option>
              {locations.map((loc) => (
                <option key={loc.id} value={String(loc.id)}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-primary text-base">Тип храна</label>
            <div
              className="grid gap-2
                grid-cols-2
                max-h-[600px]
                overflow-y-auto
                sm:grid-cols-2 sm:max-h-[600px]
                lg:grid-cols-5 lg:max-h-[200px]"
              style={{ gridAutoRows: "minmax(32px,auto)" }}
            >
              {foodTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 cursor-pointer select-none text-primary"
                >
                  <Checkbox
                    className="text-secondary"
                    checked={foodTypeIds.includes(String(type.id))}
                    onCheckedChange={(checked) => {
                      const id = String(type.id);
                      setFoodTypeIds((prev) =>
                        checked
                          ? [...prev, id]
                          : prev.filter((fid) => fid !== id)
                      );
                    }}
                  />
                  <span>{type.name}</span>
                </label>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Добавяне..." : "Добавете ресторант"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddRestaurant;
