import {
  Car,
  Hamburger,
  User,
  MapPinned,
  Backpack,
  CookingPot,
} from "lucide-react";

const commonIconStyles = "stroke-1 stroke-primary-content size-8";

export const HOW_IT_WORKS_VALUES = [
  {
    icon: <User className={commonIconStyles} />,
    header: "Създайте своя профил",
    description:
      "Създайте вашият профил в платформата, за да започнете своето пътешествие.",
  },
  {
    icon: <MapPinned className={commonIconStyles} />,
    header: "Избери маршрут",
    description:
      "След създаване на вашият профил, с натискане на бутона Ново пътешествие, ще трябва да изберете начална и крайна точка на вашето пътешествие.",
  },
  {
    icon: <Car className={commonIconStyles} />,
    header: "Старт на пътешествието",
    description:
      "След като изберете начална и крайна точка, следвайте указанията на картата, за да стигнете до вашата дестинация.",
  },
  {
    icon: <Hamburger className={commonIconStyles} />,
    header: "Събирайте точки",
    description:
      "Докато пътувате, събирайте точки въз основа на изминатите километри, които можете да обмените за отстъпки и ваучери в реални заведения.",
  },
];

export const WHY_US_VALUES = [
  {
    icon: <Backpack className={commonIconStyles} />,
    header: "За пътешествениците",
    description: "Пътувай. Яж. Откривай. Спестявай.",
    items: [
      "Намери заведения на пътя си, без да обикаляш Google Maps.",
      "Отключвай отстъпки само докато си в заведението (чрез GPS + QR).",
      "Трупай километри – взимай ваучери и награди.",
      "Пътувай с “Road Trip Mode” – твоят личен GPS пътеводител.",
      "Реални ревюта – само от пътешественици на място, не от фалшиви профили.",
    ],
  },
  {
    icon: <CookingPot className={commonIconStyles} />,
    header: "За заведенията",
    description: "Повече реални гости. По-малко празни маси.",
    items: [
      "Достигни директно до хора, които вече пътуват към теб.",
      "Получавай ревюта само от реални посетители.",
      "Виж статистика – откъде идват гостите и колко пътуват.",
      "Плати само за реални посещения (Pay Per Visit модел).",
      "Създавай оферти в реално време – Happy Hour, Седмично меню, Road Trip промо.",
    ],
  },
];

export const FOOTER_VALUES = [
  {
    header: "Полезно",
    items: [
      {
        subHeader: "Често задавани въпроси",
        link: "/",
      },
      {
        subHeader: "Форма за контакт",
        link: "/",
      },
      {
        subHeader: "Търси по населено място",
        link: "/",
      },
      {
        subHeader: "Ресторанти",
        link: "/",
      },
    ],
  },
  {
    header: "За бизнеси",
    items: [
      {
        subHeader: "Ресторанти",
        link: "/",
      },
      {
        subHeader: "Партньорска програма",
        link: "/",
      },
      {
        subHeader: "Регитрирай бизнеса си",
        link: "/",
      },
    ],
  },
  {
    header: "Правни документи",
    items: [
      {
        subHeader: "Условия за ползване",
        link: "/",
      },
      {
        subHeader: "Политика за поверителност",
        link: "/",
      },
    ],
  },
];
