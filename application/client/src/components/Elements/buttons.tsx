import React from "react";


interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  text: string;
  onClick?: () => void;
  loading?: boolean;
}

export function Button({
  type = "button",
  className = "",
  text,
  onClick,
  loading = false,
  ...props
}: ButtonProps) {
  const buttonClasses = `flex items-center justify-center text-ph_blue_light py-3 px-4 w-full h-[40px] focus:outline-none rounded-[15px] text-sm border-solid border-2 border-ph_blue_light ${className} ${!loading && "hover:bg-ph_blue_light hover:text-white hover:border-ph_blue_light"
    }`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-ph_blue_light"></div>
      ) : (
        text
      )}
    </button>
  );
}
