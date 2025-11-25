// import { Button } from "@/components/ui/button";
// import supabase from "@/supabase";

export default function LatestUploaded() {
  // const addRestaurant = async () => {
  //   const newRestaurant = {
  //     name: "Test Restaurant",
  //     location_id: 1,
  //     type_food_id: 1,
  //     logo: "",
  //     images: "",
  //   };

  //   const { data, error } = await supabase
  //     .from("restaurants")
  //     .insert([newRestaurant])
  //     .single();

  //   if (error) {
  //     console.error("Error adding restaurant:", error);
  //   } else {
  //     console.log("Restaurant added:", data);
  //   }
  // };
  return (
    <section className="flex justify-center items-center bg-base-100 full-width-sect">
      <h2 className="font-bold">Последно добавени ресторанти</h2>
      {/* <Button onClick={addRestaurant}>Add Test Restaurant</Button> */}
    </section>
  );
}
