import {
  Hamburger,
  User,
  MapPinned,
  CookingPot,
  Star,
  Eye,
  Building2,
  LaptopMinimalCheck,
  Mail,
} from "lucide-react";

const commonIconStyles = "stroke-1 stroke-primary-content size-8";

export const HOW_IT_WORKS_VALUES = [
  {
    icon: <User className={commonIconStyles} />,
    header: "Създайте своя профил",
    description:
      "Регистрирай се бързо и лесно, за да откриваш заведения и да оценяваш",
  },
  {
    icon: <MapPinned className={commonIconStyles} />,
    header: "Открий ресторантите",
    description:
      "Разглеждай заведения по град, кухня, атмосфера и популярни ястия. Виж реални снимки и менюта, качени директно от ресторантите.",
  },
  {
    icon: <Hamburger className={commonIconStyles} />,
    header: "Разгледай менюто и вземи решение",
    description:
      "Потопи се в ястията, които заведението предлага – със снимки, описания и препоръки от други гости. Лесно, ясно и визуално.",
  },
  {
    icon: <Star className={commonIconStyles} />,
    header: "Оцени",
    description:
      "Посети мястото и остави своя реална оценка. Помогни на другите да изберат правилното място и повлияй на позицията на ресторанта в платформата.",
  },
];

export const WHY_US_VALUES = [
  {
    icon: <User className={commonIconStyles} />,
    header: "За гости",
    description: "Откривай истински вкусове. Избирай по реални впечатления.",
    items: [
      "Намери ресторанти според твоите предпочитания – кухня, атмосфера, снимки, популярни ястия.",
      "Виж какво предлага всеки ресторант – ястия, визия, стил, реални кадри.",
      "Лайквай или дислайквай заведения, които си посетил – помогни на другите да избират по-лесно.",
    ],
  },
  {
    icon: <CookingPot className={commonIconStyles} />,
    header: "За ресторантите",
    description: "Повече видимост. Повече гости.",
    items: [
      "Представи истинския облик на твоето заведение с професионални снимки и меню с ястия.",
      "Покажи на гостите какво предлагаш – от специалитети до атмосфера.",
      "Виж статистика – откъде идват гостите и колко пътуват.",
      "Плати само за реални посещения (Pay Per Visit модел).",
      "Управлявай профила си лесно – добавяй снимки, обновявай менюто, подчертавай специални предложения.",
    ],
  },
];

export const FOOTER_VALUES = [
  {
    header: "Полезно",
    items: [
      {
        subHeader: "Контакти",
        link: "/contact",
      },
      {
        subHeader: "Търси по населено място",
        link: "/restaurants",
      },
      {
        subHeader: "Ресторанти",
        link: "/restaurants",
      },
    ],
  },
  {
    header: "За бизнеси",
    items: [
      {
        subHeader: "Ресторанти",
        link: "/restaurants",
      },
      {
        subHeader: "Регитрирай бизнеса си",
        link: "/register",
      },
    ],
  },
];

export const CORE_VALUES = [
  {
    icon: <Eye />,
    header: "Прозрачност",
    description:
      "Вярваме, че добрата информация прави добрия избор. Всяко заведение получава ясен профил с меню, снимки, ревюта и оценка.",
  },
  {
    icon: <LaptopMinimalCheck />,
    header: "Достъпност",
    description:
      "Работим за това всеки ресторант в България да може да достигне гостите си онлайн — от големия град до най-малкото село.",
  },
  {
    icon: <Building2 />,
    header: "Растеж",
    description:
      "Помагаме на заведенията да увеличат видимостта си чрез умни промоции, селекции и лесни инструменти за управление.",
  },
];

export const TEAM = [
  {
    name: "Мирослав Димитров",
    title: "Основател и единствен член на екипа",
    image: "/images/team/miroslav.jpg",
    description:
      "Създател на Bulgaria Taste. Обича да намира добри места за хранене и да помага на малките и средни ресторанти да имат професионално онлайн присъствие.",
    socials: [
      {
        icon: <Mail className="stroke-primary" />,
        label: "Gmail",
        link: "mailto:mdimitrov963@gmail.com",
      },
    ],
  },
];
