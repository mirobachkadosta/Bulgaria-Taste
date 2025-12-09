import ThemeToggle from "../theme-toggle/ThemeToggle";
import { XIcon, Menu, Plus } from "lucide-react";
import { useState } from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { globalStore } from "@/store/globalStore";
import DropdownMenuPopUp from "../user-menu-dropdown/UserMenuDropdown";
import { useNavigate } from "react-router";
import { NAV_DEFAULT_ELEMENTS } from "@/utility/constants";
export default function MobileDrawerNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = globalStore();

  return (
    <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen} direction="bottom">
      <div className="flex gap-4">
        {user ? <DropdownMenuPopUp /> : null}
        <DrawerTrigger
          aria-label="Отвори страничното навигация"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="stroke-primary" />
        </DrawerTrigger>
      </div>

      <DrawerOverlay onClick={() => setIsMenuOpen(false)} />
      <DrawerContent className="bg-base-100">
        <DrawerHeader>
          <DialogDescription className="sr-only">
            Мобилна навигация за смяна на страниците, темата и вход в акаунта.
          </DialogDescription>
          <DialogTitle className="text-end text-primary">
            <Button
              autoFocus
              size="icon"
              variant="ghost"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Затвори менюто"
            >
              <XIcon />
            </Button>
          </DialogTitle>
        </DrawerHeader>
        <nav className="grid grid-cols-1 px-4 pb-3 gap-3 text-sm text-primary">
          {NAV_DEFAULT_ELEMENTS.map(
            (element: { title: string; url: string }, indx: number) => {
              if (user && element.title === "Регистрация") {
                return null;
              }
              return (
                <Link
                  className="flex! items-center h-[41px]"
                  key={indx}
                  to={element.url}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {element.title}
                </Link>
              );
            }
          )}
        </nav>
        <div className="grid grid-cols-1 max-w-[300px] gap-6 py-3 px-4 border-t mx-auto border-base-200">
          <ThemeToggle />
          {user ? (
            <Button
              variant="default"
              size="default"
              aria-label="Добави услуга"
              className="justify-start"
              onClick={() => {
                {
                  navigate("/");
                  setIsMenuOpen(false);
                }
              }}
            >
              <Plus />
              Добави услуга
            </Button>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
