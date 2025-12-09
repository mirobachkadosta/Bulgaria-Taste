import { Link, redirect } from "react-router";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { IconBg } from "../../components/icon-bg/IconBg";
import { contactUsLink, registerLink } from "../../utility/links";
import { CORE_VALUES, TEAM } from "../../utility/staticValues";

export default function AboutUsContent() {
  return (
    <main className="full-width-section bg-base-100">
      <HeaderSection
        header="За нас"
        subHeader="Bulgaria Taste — вкусът на българските заведения онлайн"
      />

      <div className="mb-12 grid grid-cols-[auto] grid-rows-[auto, auto] gap-12 m-4 lg:m-0">
        <section id="kak-zapochna" className="content-container ">
          <h2 className="text-center mb-4 mt-6">Как започнахме</h2>
          <article className="text-base">
            <p>
              Bulgaria Taste е роденa от желанието да направим българските
              ресторанти видими за повече хора. Идеята се заражда като личен
              импулс — търсене на ново място за вечеря и установяване, че
              информацията често е фрагментирана, непълна или трудна за
              откриване. Сега нашата мисия е да обединим ресторанти от всички
              градове и населени места в България под един, доверен дигитален
              покрив.
            </p>
            <p>
              Платформата е строена с мисъл както за гостите, така и за
              заведенията: гостите могат лесно да откриват нови места, да
              разглеждат менюта, снимки и ревюта, а собствениците — да получат
              професионално онлайн присъствие и да привлекат повече нови гости.
              Ако имате въпроси или искате да добавите заведение, свържете се с
              нас чрез нашата
              <Link to={contactUsLink} className="font-bold mx-1">
                контактна форма
              </Link>
              .
            </p>
          </article>
        </section>

        <section id="cennosti" className="content-container">
          <h2 className="text-center mb-4">Нашите ценности</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
            {CORE_VALUES.map((el, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <IconBg
                  icon={el.icon}
                  iconClassName="stroke-primary-content sm:w-10 sm:h-10 w-6 h-6"
                  className="bg-primary w-16 h-16 sm:w-20 sm:h-20"
                />
                <h3>{el.header}</h3>
                <p className="text-center">{el.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="za-gostite" className="content-container mb-12">
          <h2 className="text-center mb-4">За гостите</h2>
          <article className="text-base">
            <p>
              Търсите ново място за обяд, романтична вечеря или специално меню?
              Bulgaria Taste ви предлага лесно търсене по град, тип кухня,
              ценови диапазон и оценки. Виждате снимки, актуално меню и мнения
              от други гости — всичко на едно място, за да решите бързо и
              уверено.
            </p>
            <p>
              Нашите филтри и селекции са създадени да ви помогнат да откриете
              точно това, което търсите — от уютни семейни места до модерни
              заведения с авторска кухня.
            </p>
          </article>
        </section>

        <section id="za-zavedenia" className="content-container">
          <h2 className="text-center mb-4">За заведенията</h2>
          <article className="text-base mb-12">
            <p>
              Независимо дали сте семейна сладкарница, малък квартален ресторант
              или модерно бистро — Bulgaria Taste създава възможности за растеж.
              Регистрирайки се, получавате професионален профил, видимост в
              търсенията и инструменти за представяне на вашето меню, работно
              време и специални предложения.
            </p>
            <p>
              Предлагаме също маркетинг опции — спонсорирани места, банери и
              промо кампании — за да достигнете точните клиенти в точния момент.
              Ако искате да говорим за възможности за партньорство, използвайте
              нашата
              <Link to={contactUsLink} className="font-bold mx-1">
                контактна форма
              </Link>
              .
            </p>
          </article>
        </section>
      </div>

      <section id="ekip" className="bg-base-200 mt-14 mb-20">
        <HeaderSection
          header="Екипът"
          subHeader="Кой стои зад Bulgaria Taste"
          typeOfHeader="h2"
          className="mx-4"
        />

        <div className="grid grid-cols-1 gap-6 content-container mx-auto">
          {TEAM.map((userData, index) => (
            <div
              key={index}
              className="shadow-md bg-base-100 rounded-lg flex flex-col lg:flex-row gap-4 p-6 mb-12"
            >
              <div className="shrink-0 mx-auto lg:mx-0 mt-6">
                <img
                  width={120}
                  height={120}
                  src={userData.image}
                  alt={userData.name}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 text-center lg:text-left">
                <h3 className="mb-1">{userData.name}</h3>
                <p className="font-medium mb-4 text-base">{userData.title}</p>

                <p className="mb-4 leading-relaxed">{userData.description}</p>

                <div className="flex space-x-3 justify-center lg:justify-start">
                  {userData.socials.map((social, idx) => (
                    <Link
                      target="_blank"
                      key={idx}
                      aria-label={social.label}
                      to={social.link}
                      className="icon-link!"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="viziq" className="flg:pb-20! pb-12! content-container">
        <h2 className="text-center mb-4">Нашата визия</h2>
        <article className="text-secondary">
          <p>
            Вярваме, че доброто хранене е част от качествения живот. Визията ни
            е Bulgaria Taste да бъде първата дестинация за всеки, който иска да
            открие нови вкусове — лесно, бързо и надеждно.
          </p>

          <ul>
            <li>
              Мост между госта и ресторанта — пълни профили, актуални менюта и
              лесна резервация.
            </li>
            <li>
              Видимост за всички — от големите градове до малките села, за да
              няма забравени места.
            </li>
            <li>
              Инструменти за растеж — промоции, спонсорирани позиции и
              аналитика, които помагат на заведенията да разберат своята
              аудитория.
            </li>
            <li>
              Акцент върху качеството — ревюта и оценки, които помагат на
              потребителите да вземат информирано решение.
            </li>
          </ul>

          <p>
            Ако искате да станете част от Bulgaria Taste — като гост или като
            заведение — поканваме ви да се свържете с нас. За бизнеса има
            специални опции и персонализирани предложения; за гостите — подбрани
            селекции и удобни инструменти за откриване. Присъединете се към
            нашето пътешествие и помогнете да направим българската
            ресторантьорска сцена по-видима и по-достъпна.
          </p>

          <p>
            <span
              onClick={() => redirect(registerLink)}
              className="font-bold text-primary relative cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-[width] after:duration-500 after:ease-out hover:after:w-full"
            >
              Започнете сега
            </span>
            .
          </p>
        </article>
      </section>
    </main>
  );
}
