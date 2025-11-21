import { FOOTER_VALUES } from "@/utility/staticValues";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="full-width-section flex flex-col gap-8 bg-base-100 border-t border-neutral">
      <div className="content-container grid grid-cols-[1fr_318px_318px_318px] gap-9 items-center px-4 py-8!">
        <span className="flex flex-col text-start">
          <h3>BulgariaTaste.bg</h3>
          <p>
            Bulgaria Taste е платформа, която помага на пътешественици да
            открият точните заведения за тях. Така и на ресторантите, с
            повишаване на видимоста си, за пътуващите.
          </p>
        </span>
        {FOOTER_VALUES.map((colum, i) => (
          <span
            key={i}
            className="flex flex-col items-start justify-start gap-4 h-full"
          >
            <h3>{colum.header}</h3>
            <div className="flex flex-col items-start justify-start gap-2">
              {colum.items.map((item, index) => (
                <p key={index}>
                  <Link to={item.link}>{item.subHeader}</Link>
                </p>
              ))}
            </div>
          </span>
        ))}
      </div>
      <div className="content-container border-t border-neutral flex justify-between items-end">
        <span className="text-primary text-sm py-9">
          &copy; {new Date().getFullYear()} BulgariaTaste.bg. Всички права
          запазени.
        </span>
      </div>
    </footer>
  );
}
