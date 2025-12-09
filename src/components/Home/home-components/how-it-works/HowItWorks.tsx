import { HOW_IT_WORKS_VALUES } from "@/utility/staticValues";
import { HeaderSection } from "../../../HeaderSection/HeaderSepartor";
import { IconBg } from "@/components/icon-bg/IconBg";

export default function HowItWorks() {
  return (
    <section className="bg-base-100 full-width-section lg:pb-12 pb-6">
      <div className="content-container flex flex-col justify-center items-center text-center gap-6">
        <HeaderSection
          className="lg:pt-12! pt-6!"
          header="Как точно работи?"
          typeOfHeader="h2"
        />
        <div className="grid lg:grid-cols-4 gap-12 sm:grid-cols-2 grid-cols-1 items-start">
          {HOW_IT_WORKS_VALUES.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-3"
            >
              <IconBg
                className="bg-primary size-20"
                icon={item.icon}
                iconClassName="size-8 stroke-primary-content"
              />
              <h3 className="font-bold">{item.header}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
