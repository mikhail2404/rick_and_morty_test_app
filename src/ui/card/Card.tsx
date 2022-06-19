import React, { DetailsHTMLAttributes, FC, ReactNode } from "react";
import cn from "classnames";

interface CardProps extends DetailsHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  func?: () => void;
  className?: string;
}

const Card: FC<CardProps> = ({ func, children, className }) => {
  return (
    <div onClick={func} className={cn("card", className)}>
      {children}
    </div>
  );
};

export default Card;
