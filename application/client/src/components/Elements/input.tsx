import React from "react";


interface InputProps {
  type?: "text" | "password" | "email" | "number";
  value: string | number;
  name: string;
  id: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  htmlFor: string;
  required?: boolean;
  color: string;
  labelColor: string;
  props?: any;
  min?:string;
}

export default function Input({
  type = "text",
  value,
  name,
  id,
  placeholder,
  onChange,
  label,
  htmlFor,
  required = false,
  color,
  labelColor,
  min="0",
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`text-sm font-bold ml-[-1px] text-${labelColor}`}
      >
        {label}
        {required && <span className="text-ph_tomatored">*</span>}
      </label>
      <div className="relative">
        <input
          className={`py-3 px-4 w-full h-[45px] focus:outline-none rounded-[15px] text-sm border-solid border-[1px] border-${color} focus:border-ph_blue_light  `}
          type={type}
          value={value}
          name={name}
          min={min}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}
