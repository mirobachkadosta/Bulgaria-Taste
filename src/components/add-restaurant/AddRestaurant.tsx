import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { supabase } from "../../supabase/supabase";
import type { Location, FoodType } from "@/utility/types";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { globalStore } from "@/store/globalStore";
import { Button } from "../ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger } from "../ui/select";
import { validateImage, uploadToSupabase } from "@/utility/helpers";

const AddRestaurant: React.FC = () => {
  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState<string>("");
  const [foodTypeIds, setFoodTypeIds] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [foodTypes, setFoodTypes] = useState<FoodType[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);

  const store = globalStore();
  const { isLoading, setIsLoading, setAlertStatus, user } = store;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: locationsData, error: locationsError } = await supabase
          .from("locations")
          .select();
        if (locationsError) throw locationsError;
        setLocations((locationsData as Location[]) || []);

        const { data: foodTypesData, error: foodTypesError } = await supabase
          .from("type_food")
          .select();
        if (foodTypesError) throw foodTypesError;
        setFoodTypes((foodTypesData as FoodType[]) || []);
      } catch (err: any) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent:
            "Грешка при зареждане на данни за типове храна и локация: " +
            (err?.message || String(err)),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Можете да качите максимум 3 снимки.",
      });
      return;
    }
    for (const file of files) {
      const error = validateImage(file);
      if (error) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent: error,
        });
        return;
      }
    }
    setImagesFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !locationId ||
      locationId === "default" ||
      foodTypeIds.length === 0
    ) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Всички полета са задължителни.",
      });
      return;
    }
    if (imagesFiles.length > 3) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Максимум 3 снимки.",
      });
      return;
    }

    setIsLoading(true);
    try {
      setIsLoading(true);
      try {
        let logoUrl = "";
        if (logoFile) {
          const ext = logoFile.name.split(".").pop();
          const logoPath = `logos/${logoFile.name
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9_.-]/g, "")}-${Date.now()}.${ext}`;
          try {
            logoUrl = await uploadToSupabase(logoFile, logoPath);
          } catch (error: any) {
            setAlertStatus({
              status: "error",
              statusHeader: "Грешка",
              statusContent: "Грешка при качване на логото: " + error.message,
            });
            return;
          }
        }

        const imagesUrls: string[] = [];
        for (let i = 0; i < imagesFiles.length; i++) {
          const img = imagesFiles[i];
          const ext = img.name.split(".").pop();
          const imgPath = `${img.name
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9_.-]/g, "")}-${Date.now()}.${ext}`;
          try {
            const url = await uploadToSupabase(img, imgPath);
            imagesUrls.push(url);
          } catch (error: any) {
            setAlertStatus({
              status: "error",
              statusHeader: "Грешка",
              statusContent:
                `Грешка при качване на снимка ${img.name}: ` + error.message,
            });
            return;
          }
        }

        const { error: insertError } = await supabase
          .from("restaurants")
          .insert([
            {
              name,
              location_id: Number(locationId),
              types_of_food: foodTypeIds.map(Number),
              creator_email: user?.email,
              logo: logoUrl,
              images: imagesUrls,
            },
          ])
          .select();
        if (insertError) {
          setAlertStatus({
            status: "error",
            statusHeader: "Грешка",
            statusContent:
              "Неуспешно добавяне на ресторант: " + insertError.message,
          });
          return;
        }

        setAlertStatus({
          status: "success",
          statusHeader: "Успех",
          statusContent: "Ресторантът беше добавен успешно!",
        });
        setName("");
        setLocationId("");
        setFoodTypeIds([]);
        setLogoFile(null);
        setImagesFiles([]);
      } catch (err) {
        setAlertStatus({
          status: "error",
          statusHeader: "Грешка",
          statusContent: "Неуспешно добавяне на ресторант: " + err,
        });
      } finally {
        setIsLoading(false);
      }
      setName("");
      setLocationId("");
      setFoodTypeIds([]);
      setLogoFile(null);
      setImagesFiles([]);
    } catch (err) {
      setAlertStatus({
        status: "error",
        statusHeader: "Грешка",
        statusContent: "Неуспешно добавяне на ресторант: " + err,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="full-width-section bg-base-200 pb-12">
      <div className="container mx-auto p-4">
        <HeaderSection header="Добави ресторант" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-primary text-base">Име на ресторанта</label>
            <Input
              className="border-primary placeholder:text-secondary/50 text-primary"
              placeholder="Въведете име на ресторанта..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-primary text-base">Локация</label>
            <Select value={locationId} onValueChange={setLocationId}>
              <SelectTrigger className="w-full p-2 border rounded border-primary text-secondary/50 text-left cursor-pointer">
                {locationId
                  ? locations.find((loc) => String(loc.id) === locationId)?.name
                  : "Избери"}
              </SelectTrigger>
              <SelectContent className="bg-base-100 w-[300px] max-h-[300px] overflow-y-auto">
                <SelectItem
                  value="default"
                  className="text-secondary/50 text-base hover:bg-base-300! cursor-pointer"
                >
                  Избери
                </SelectItem>
                {locations.map((loc) => (
                  <SelectItem
                    key={loc.id}
                    value={String(loc.id)}
                    className="text-primary! selection:text-primary! text-base hover:bg-base-300! cursor-pointer"
                  >
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-primary text-base">Типове храна</label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto">
              {foodTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 cursor-pointer select-none text-primary"
                >
                  <Checkbox
                    className="cursor-pointer text-primary-content bg-primary"
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

          <div>
            <div className="flex gap-3 lg:flex-row flex-col items-center">
              <Button
                className="text-accent"
                variant={"link"}
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>(
                      '[data-testid="logo-file-input"]'
                    )
                    ?.click()
                }
              >
                {logoFile ? logoFile.name : "Прикачи файл"}
              </Button>
              <span className="text-secondary/70 text-sm block mb-2">
                (JPEG/PNG, макс 4MB)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png"
                hidden
                data-testid="logo-file-input"
                onChange={handleLogoChange}
              />
            </div>
          </div>

          <div>
            <div className="flex gap-3 items-center lg:flex-row flex-col">
              <Button
                className="text-accent"
                variant={"link"}
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>(
                      '[data-testid="images-file-input"]'
                    )
                    ?.click()
                }
              >
                {imagesFiles.length > 0
                  ? `${imagesFiles.length} файл${
                      imagesFiles.length > 1 ? "а" : ""
                    }`
                  : "Прикачи файл"}
              </Button>
              <span className="text-secondary/70 text-sm block mb-2">
                (до 3 файла, JPEG/PNG, макс 4MB всеки)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png"
                multiple
                hidden
                data-testid="images-file-input"
                onChange={handleImagesChange}
              />
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
