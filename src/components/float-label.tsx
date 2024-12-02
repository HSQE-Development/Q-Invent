import { cn } from "@/lib";
import React, { useState } from "react";

interface FloatLabelInterface {
  label: string;
  children: React.ReactElement;
  for?: string;
  value?: string | number | undefined;
  className?: string;
  obligatory?: boolean;
}

const FloatLabel: React.FC<FloatLabelInterface> = (props) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    props.children.props.value
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const childProps = {
    value: inputValue,
    onChange: handleChange,
  };
  return (
    <div className={cn("flex flex-col-reverse", props.className)}>
      {React.cloneElement(props.children, {
        ...childProps,
        ...props.children.props,
      })}
      <label htmlFor={props.for}>
        {props.label}{" "}
        {props.obligatory && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};
export default FloatLabel;
