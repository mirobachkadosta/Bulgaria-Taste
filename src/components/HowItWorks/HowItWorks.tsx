import { MapPin, User, Car } from "lucide-react";
export default function HowItWorks() {
  return (
    <section className="bg-base-100 full-width-section">
      <div className="content-container flex flex-col justify-center items-center text-center">
        <h2 className="font-bold">Как точно работи?</h2>
        <div className="grid grid-cols-4 gap-4 items-start">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="bg-primary lg:size-20 rounded-full flex items-center justify-center">
              <User className="stroke-1 stroke-primary-content lg:size-8" />
            </div>
            <h3 className="font-bold">Създайте своя профил</h3>
            <p>
              Създайте вашият профил в платформата, за да започнете да събирате
              вашите точки за изминатите километри.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="bg-primary lg:size-20 rounded-full flex items-center justify-center">
              <MapPin className="stroke-1 stroke-primary-content lg:size-8" />
            </div>
            <h3 className="font-bold">Избиране на маршрут</h3>
            <p>
              С натискане на бутона <b>"Ново пътешествие"</b>, ще трябва да
              изберете начална и крайна точка на вашето пътешествие.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="bg-primary lg:size-20 rounded-full flex items-center justify-center">
              <Car className="stroke-1 stroke-primary-content lg:size-8" />
            </div>
            <h3 className="font-bold">Лек път</h3>
            <p>
              По време на вашето пътуване ще събирате точки, за изминатите
              километри. С нашите точки може да получите отстъпка в някой от
              ресторантите по вашият маршрут.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="bg-primary lg:size-20 rounded-full flex items-center justify-center">
              <User className="stroke-1 stroke-primary-content lg:size-8" />
            </div>
            <h3 className="font-bold">Създайте своя профил</h3>
            <p>
              Създайте вашият профил в платформата, за да започнете да събирате
              вашите точки за изминатите километри.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
