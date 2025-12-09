import { Link } from "react-router-dom";
import { HeaderSection } from "../../components/HeaderSection/HeaderSepartor";
import { IconBg } from "../../components/icon-bg/IconBg";
import { Mail, Phone } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "../../utility/constants";

export default function ContactUsContent() {
  return (
    <section className="bg-base-100 full-width-section">
      <HeaderSection
        header="Свържете се с нас"
        subHeader="Bulgaria Taste — платформа за видимост на ресторантите в България"
      />

      <main className="content-container pb-12!">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              За въпроси, съдействие и партньорства
            </h2>

            <p className="mb-4 text-base leading-relaxed">
              Bulgaria Taste съществува с цел да направи българските ресторанти
              по-видими, по-достъпни и лесни за откриване от нови гости. Ако
              имате въпроси относно добавянето на заведение, управление на
              информация, рекламни възможности или партньорства — пишете ни или
              се свържете директно по телефон.
            </p>

            <p className="mb-6 text-base leading-relaxed">
              Работим с всички типове заведения — от малки семейни ресторанти до
              модерни градски места с авторска кухня. Дори и да сте тепърва
              стартиращо заведение, можем да ви помогнем да изградите силно
              онлайн присъствие и да привлечете първите си гости.
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">
              Какво можем да направим за вас
            </h3>
            <ul className="list-disc pl-5 mb-4 text-base text-primary">
              <li>Публикуване и оптимизация на профил на заведение;</li>
              <li>Добавяне на меню, снимки и информация за работно време;</li>
              <li>Възможности за реклама и спонсорирани секции;</li>
              <li>Предложения за подобрение на онлайн видимостта;</li>
              <li>Съдействие при технически въпроси.</li>
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center text-primary gap-3 mt-8">
              <Link to="/register" className="btn btn-primary">
                Регистрирай заведение
              </Link>

              <Link to="/" className="btn btn-ghost">
                Върнете се към началната страница
              </Link>
            </div>
          </section>

          <aside className="bg-base-200 p-6 rounded-lg flex flex-col gap-5 text-primary">
            <div>
              <h3 className="text-lg font-medium">Контакти</h3>
              <p className="text-sm text-muted mb-3">
                Свържете се директно с нас:
              </p>

              <div className="flex items-start gap-3 mb-3">
                <IconBg
                  iconClassName="text-primary-content!"
                  icon={<Mail size={20} />}
                  className="w-12 h-12 bg-primary"
                />
                <div>
                  <p className="text-sm text-muted">Имейл</p>
                  <a
                    className="font-medium block break-all"
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconBg
                  iconClassName="stroke-primary-content"
                  icon={<Phone size={20} />}
                  className="w-12 h-12 bg-primary"
                />
                <div>
                  <p className="text-sm text-muted">Телефон</p>
                  <a
                    className="font-medium block"
                    href={`tel:${CONTACT_PHONE_TEL}`}
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-muted">Екип</h4>
              <p className="font-medium">Мирослав Димитров — основател</p>
            </div>

            <div>
              <h4 className="text-sm text-muted">За какво може да ни пишете</h4>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li>Добавяне или корекция на ресторант;</li>
                <li>Възможности за реклама и кампании;</li>
                <li>Въпроси относно съдържанието;</li>
                <li>Предложения за подобрения;</li>
                <li>Идейни партньорства и събития.</li>
              </ul>
            </div>

            <div>
              <p className="text-xs text-muted">
                Обикновено отговаряме в рамките на няколко работни дни. За
                спешни въпроси използвайте телефонния номер.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </section>
  );
}
