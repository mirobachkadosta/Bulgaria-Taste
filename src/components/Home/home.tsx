import HowItWorks from "../HomePage/HowItWorks/HowItWorks";
import WhyUsSection from "../HomePage/WhyUs/WhyUs";

export default function Home() {
  return (
    <div className="content-container">
      <WhyUsSection />
      <HowItWorks />
      {/* <div className="text-primary-content">
        <h1>Открий истинския вкус на България</h1>
        <h2>
          Пътувай, събирай километри, отключвай отстъпки и ваучери в реални
          заведения.
        </h2>
      </div> */}
    </div>
  );
}
