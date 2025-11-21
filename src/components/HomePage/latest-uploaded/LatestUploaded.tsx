import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase";

export default function LatestUploaded() {
  const addRestaurant = async () => {
    const newRestaurant = {
      id: 1,
      created_at: new Date(),
      name: "Test Restaurant",
      location_id: 1,
      type_of_food_id: 1,
      logo: "",
      images: "",
    };

    const { data, error } = await supabase
      .from("restaurants")
      .insert([newRestaurant])
      .single();

    if (error) {
      console.error("Error adding restaurant:", error);
    } else {
      console.log("Restaurant added:", data);
    }
  };
  return (
    <section className="flex justify-center items-center bg-base-100">
      <h2 className="font-bold">Последно добавени ресторанти</h2>
      <Button onClick={addRestaurant}>Add Test Restaurant</Button>
    </section>
  );
}
