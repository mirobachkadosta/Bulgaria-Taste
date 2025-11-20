import { Link } from "react-router";
import { Button } from "../ui/button";
import ThemeToggleButton from "../theme-toggle/ThemeToggle";

const NAV_DEFAULT_ELEMENTS = [
  { title: "Маршрути", url: "/restaurants" },
  { title: "За нас", url: "/about" },
  { title: "Контакти", url: "/contact" },
];
export default function Header() {
  return (
    <header className="border-b bg-base-200 py-2 lg:py-3 border-base-300 sticky top-0 lg:relative lg:top-auto z-50">
      <div className="m-auto content-container flex items-center justify-between px-4">
        <div className="flex items-center lg:gap-8">
          <Link
            to="/"
            aria-label="Върни се към началната страница"
            role="button"
            className="cursor-pointer text-primary font-bold"
          >
            Bulgaria Taste
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden invisible lg:flex lg:visible lg:px-4 lg:gap-9 text-sm text-primary font-medium">
            {NAV_DEFAULT_ELEMENTS.map(
              (element: { title: string; url: string }, indx: number) => (
                <Link key={indx} to={element.url}>
                  {element.title}
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Button>Вход</Button>
          </div>
        </div>
        {/* <div className="lg:hidden flex gap-4">
          {!userState.user?.id ? (
            <Button
              onClick={() => globalState.setIsLoginModalOpen(true)}
              variant="default"
              size="default"
              aria-label="Вход в акаунта"
              className="justify-start"
            >
              <LogIn />
            </Button>
          ) : null}

          {isMobile && MobileNavDrawerComponent && <MobileNavDrawerComponent />}
        </div> */}
        {/* <div className="hidden lg:flex lg:gap-4 lg:items-center">
          <ThemeToggle showAsText={false} />
          {userState.user?.id ? (
            <div className="flex items-center gap-3">
              <DropdownMenuPopUp />
              <Button
                variant="default"
                onClick={() => router.push(addServiceLink)}
              >
                Добавете услуга
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => globalState.setIsLoginModalOpen(true)}
              aria-label="Вход в акаунта"
            >
              Вход
            </Button>
          )}
        </div> */}
      </div>
    </header>
  );
}
