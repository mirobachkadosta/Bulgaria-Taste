import { Link } from "react-router";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { Button } from "../ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="full-width-section bg-base-100 min-h-[70vh] flex items-center justify-center py-12">
      <div className="content-container flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <HeaderSection
            header="Страницата не е намерена"
            className="pt-0!"
            subHeader="Съжаляваме, но страницата, която търсите, не съществува или е била преместена."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link to="/">
            <Button variant="secondary" className="gap-2">
              <Home className="w-4 h-4" />
              Начална страница
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2 text-primary border-primary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Button>
        </div>

        <div className="mt-8 p-6 bg-base-200 rounded-lg max-w-md flex flex-col items-center">
          <p className="text-secondary text-sm">
            Ако смятате, че това е грешка, моля свържете се с нас или се
            опитайте да посетите една от следните страници:
          </p>
          <div className="flex lg:flex-row flex-col gap-2 mt-4 text-sm">
            <Link to="/restaurants" className="text-accent hover:underline">
              Ресторанти
            </Link>
            <Link to="/about" className="text-accent hover:underline">
              За нас
            </Link>
            <Link to="/contact" className="text-accent hover:underline">
              Контакти
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
