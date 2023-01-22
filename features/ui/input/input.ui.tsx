import React from "react";

interface UIInputProps {
  idx: number;
  name?: string;
  value: string;
  type?: "text" | "password" | "email";
  placeholder: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
}

const UIInput = ({
  idx,
  name,
  value,
  type = "text",
  placeholder,
  handleOnChange,
}: UIInputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className="w-full rounded-md border border-gray-300 p-2"
      placeholder={placeholder}
      onChange={(e) => handleOnChange(e, idx)}
    />
  );
};

export default UIInput;
