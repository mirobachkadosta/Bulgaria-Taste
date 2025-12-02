import { Link } from "react-router";
import { Button } from "../ui/button";
import { globalStore } from "@/store/globalStore";
import { useNavigate } from "react-router";
import { LogIn } from "lucide-react";
import ThemeToggleButton from "../theme-toggle/ThemeToggle";
import UserMenuDropdown from "../user-menu-dropdown/UserMenuDropdown";
import { NAV_DEFAULT_ELEMENTS } from "@/utility/constants";
import MobileDrawerNav from "../mobile-navigation/MobileNavigation";

export default function Header() {
  const { user } = globalStore();
  const navigate = useNavigate();
  return (
    <header className="border-b bg-base-200 py-2 lg:py-3 border-base-300 sticky top-0 lg:relative lg:top-auto z-50">
      <div className="m-auto content-container flex items-center justify-between px-4">
        <div className="flex items-center lg:gap-8">
          <Link
            to="/"
            aria-label="Върни се към началната страница"
            role="button"
            className="cursor-pointer text-primary! font-bold"
          >
            Bulgaria Taste
          </Link>
        </div>
        <div className="lg:flex items-center gap-3 hidden">
          <nav className="hidden invisible lg:flex lg:visible lg:px-4 lg:gap-9 text-sm text-primary font-medium">
            {NAV_DEFAULT_ELEMENTS.map((element, indx) => {
              if (element.title === "Регистрация" && user) return null;
              return (
                <Link key={indx} to={element.url}>
                  {element.title}
                </Link>
              );
            })}
          </nav>
          {user ? (
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggleButton />
              <UserMenuDropdown />
            </div>
          ) : null}
        </div>
        {!user && (
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggleButton />
            <MobileDrawerNav />
          </div>
        )}
        <div className="lg:hidden flex gap-4">
          {user ? (
            <Button
              onClick={() => navigate("/login")}
              variant="default"
              size="default"
              aria-label="Вход в акаунта"
              className="justify-start"
            >
              <LogIn />
            </Button>
          ) : null}
        </div>
        <div className="hidden lg:flex lg:gap-4 lg:items-center">
          <ThemeToggleButton />
          {user?.email ? (
            <div className="flex items-center gap-3">
              <UserMenuDropdown />
              <Button
                variant="default"
                onClick={() => navigate("/add-restaurant")}
              >
                Добавете ресторант
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              aria-label="Вход в акаунта"
            >
              Вход
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
