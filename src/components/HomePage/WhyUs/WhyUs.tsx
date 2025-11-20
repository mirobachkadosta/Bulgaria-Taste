import { HeaderSection } from "@/components/HeaderSection/HeaderSepartor";
import { WHY_US_VALUES } from "@/utility/staticValues";
export default function WhyUsSection() {
  return (
    <section className="bg-base-200 full-width-section lg:pb-12 pb-6">
      <div className="content-container flex flex-col justify-center items-center gap-6">
        <HeaderSection
          className="lg:pt-12! pt-6!"
          header="Защо да изберете Bulgaria Taste?"
          subHeader="Пътувай умно. Яж автентично. Спестявай реално."
          typeOfHeader="h2"
        />
        <div className="grid lg:grid-cols-2 lg:grid-rows-1 gap-12 grid-rows-2 grid-cols-1 items-start bg-base-100 px-12 py-12 rounded-2xl w-full shadow-xl">
          {WHY_US_VALUES.map((section, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-4 text-center"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="bg-primary size-20 rounded-full flex items-center justify-center">
                  {section.icon}
                </div>
                <h3 className="font-bold text-lg">{section.header}</h3>
                <p>{section.description}</p>
              </div>
              <ul className="list-disc list-inside flex flex-col gap-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              {index < WHY_US_VALUES.length - 1 && (
                <div className="lg:block absolute lg:top-0 lg:-right-5 lg:h-full lg:w-0.5 h-0.5 w-full -bottom-7 bg-primary rounded-2xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
