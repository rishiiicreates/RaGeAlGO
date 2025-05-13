import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const PixelButton = ({ 
  href, 
  className, 
  children, 
  ...props 
}: PixelButtonProps) => {
  const buttonClasses = cn(
    "pixel-button", 
    "border-2 border-retro-white shadow-pixel",
    className
  );
  
  if (href) {
    return (
      <Link href={href}>
        <a className={buttonClasses}>
          {children}
        </a>
      </Link>
    );
  }
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
