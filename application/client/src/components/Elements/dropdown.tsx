import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (selectedValue: string) => void;
  label: string;
  id: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  id,
}: DropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div >
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        defaultValue={value}
        onChange={handleChange}
        className="py-3 px-4 w-full h-[45px] focus:outline-none rounded-[15px] text-sm border-solid border-[1px] border-gray-300 focus:border-ph_blue_light"
        >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
