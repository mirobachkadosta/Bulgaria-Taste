import HowItWorks from "./home-components/how-it-works/HowItWorks";
import WhyUsSection from "./home-components/why-us/WhyUs";
import LatestUploaded from "./home-components/latest-uploaded/LatestUploaded";

export default function Home() {
  return (
    <div className="content-container">
      <LatestUploaded />
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
