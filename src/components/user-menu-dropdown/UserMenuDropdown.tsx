import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { User, LogOut } from "lucide-react";
import { globalStore } from "@/store/globalStore";
import { useNavigate } from "react-router";
import { IconBg } from "../icon-bg/IconBg";

export default function UserMenuDropdown() {
  const { logout, user } = globalStore();
  const navigate = useNavigate();

  if (!user || !user.email) return null;

  const displayName = () => {
    if (user && user.email && user.email.length <= 3) {
      return "*".repeat(user.email.length);
    }

    const visible = user && user.email && user.email.slice(0, 3);
    const masked = user && user.email && "*".repeat(user.email.length - 3);
    return `${visible}${masked}`;
  };
  const USER_INTERNAL_MENUS = [
    {
      header: "Профил",
      icon: <User />,
      link: `/profile/${user.id}`,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Отворете потребителското меню"
          className="w-auto lg:h-auto h-10 border-neutral border hover:bg-base-200/90 text-primary inline-flex items-center lg:px-4 px-2 lg:py-2 py-1.5 cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:border aria-invalid:border-destructive"
        >
          {user && user.logo ? (
            <img
              src={user.logo || undefined}
              className="size-6 rounded-full object-cover shrink-0"
              alt="Потребителска снимка на профила"
            />
          ) : (
            <IconBg icon={<User className="size-6 p-0.5" />}></IconBg>
          )}
          <span
            aria-label="Потребителски име или имейл"
            className="text-primary max-w-[100px] truncate overflow-hidden whitespace-nowrap text-sm hidden lg:block gap-2"
          >
            {displayName()}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-55 bg-base-100 border-base-200">
          <DropdownMenuLabel className="font-semibold text-primary text-sm">
            Моят профил
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-base-200" />
          <DropdownMenuGroup>
            {USER_INTERNAL_MENUS.map((singleMenu, index) => (
              <Link
                key={index}
                style={{ display: "flex !important" }}
                to={singleMenu.link}
                className="px-2 w-full pl-0 no-underline!"
              >
                <DropdownMenuItem className="text-sm text-primary">
                  {singleMenu.icon}
                  <span className="px-2">{singleMenu.header}</span>
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator className="bg-base-200" />
            <DropdownMenuItem
              className="text-sm text-primary"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut />
              <div className="px-2">Изход</div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
