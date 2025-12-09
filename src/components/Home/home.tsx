import HowItWorks from "./home-components/how-it-works/HowItWorks";
import WhyUsSection from "./home-components/why-us/WhyUs";

export default function Home() {
  return (
    <div className="content-container">
      <WhyUsSection />
      <HowItWorks />
    </div>
  );
}
