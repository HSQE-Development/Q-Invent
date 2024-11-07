import { cn } from "@/lib";
import React, { useEffect, useState } from "react";

interface FloatLabelInterface {
  children: React.ReactElement;
  label: string;
  for?: string;
  className?: string;
}

const FloatLabel: React.FC<FloatLabelInterface> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Verifica si el `input` tiene algún valor
  useEffect(() => {
    const inputElement = document.getElementById(
      props.for || ""
    ) as HTMLInputElement;
    if (inputElement) {
      setHasValue(!!inputElement.value);
    }
  }, [props.for]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };
  return (
    <div className={cn("relative w-full h-full", props.className)}>
      {React.cloneElement(props.children, {
        className: `w-full border border-gray-300 rounded-md px-3 py-2 
                    focus:outline-none focus:border-blue-500 transition-all`,
        onFocus: handleFocus,
        onBlur: handleBlur,
      })}
      <label
        htmlFor={props.for}
        className={cn("absolute left-3 transition-all duration-200", {
          "bottom-1.5 text-gray-500": !isFocused && !hasValue,
          "bottom-10 text-sm text-blue-500": isFocused || hasValue,
        })}
      >
        {props.label}
      </label>
    </div>
  );
};
export default FloatLabel;
