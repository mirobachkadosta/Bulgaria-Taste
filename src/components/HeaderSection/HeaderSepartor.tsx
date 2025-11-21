type HeaderSectionProps = {
  header: string;
  subHeader?: string;
  typeOfHeader?: "h1" | "h2";
  className?: string;
};

export const HeaderSection = ({
  header,
  subHeader,
  typeOfHeader = "h1",
  className,
}: HeaderSectionProps) => {
  return (
    <div className={`text-center pb-6 pt-6 lg:pt-12 ${className}`}>
      {typeOfHeader === "h1" ? (
        <h1 className="">{header}</h1>
      ) : (
        <h2
          className="
        font-bold!"
        >
          {header}
        </h2>
      )}
      <div className="flex justify-center">
        <div className="bg-primary mt-4 mb-4 w-25 h-0.5 rounded" />
      </div>
      <p>{subHeader}</p>
    </div>
  );
};
