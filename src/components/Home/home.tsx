import HowItWorks from "../HomePage/how-it-works/HowItWorks";
import WhyUsSection from "../HomePage/why-us/WhyUs";
import Footer from "../footer/Footer";
import LatestUploaded from "../HomePage/latest-uploaded/LatestUploaded";
export default function Home() {
  return (
    <div className="content-container">
      <LatestUploaded />
      <WhyUsSection />
      <HowItWorks />
      <Footer />
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
