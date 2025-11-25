import React from "react";

type IconBgProps = {
  icon: React.ReactElement;
  size?: number;
  iconClassName?: string;
  strokeWidth?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const IconBg = ({
  icon,
  size,
  iconClassName,
  strokeWidth,
  className = "",
  ...rest
}: IconBgProps) => {
  const clonedIcon = React.cloneElement(icon, {
    ...(size !== undefined && { size }),
    ...(strokeWidth !== undefined && { strokeWidth }),
    className: iconClassName,
  } as any);

  return (
    <div
      className={`flex justify-center items-center rounded-full ${className}`}
      {...rest}
    >
      {clonedIcon}
    </div>
  );
};
