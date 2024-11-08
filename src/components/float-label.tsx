import { cn } from "@/lib";
import React, { useEffect, useState } from "react";

interface FloatLabelInterface {
  label: string;
  children: React.ReactElement;
  for?: string;
  value?: string | number | undefined;
  className?: string;
  obligatory?: boolean;
}

const FloatLabel: React.FC<FloatLabelInterface> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    props.value ?? props.children.props.value
  );
  useEffect(() => {
    const newValue = props.value ?? props.children.props.value;
    setInputValue(newValue);
  }, [props.value, props.children.props.value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!inputValue || inputValue.toString().trim() === "") {
      setIsFocused(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isFloating =
    isFocused || (inputValue && inputValue.toString().length !== 0);

  const labelClass = isFloating ? "label label-float" : "label";

  const childProps = {
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    onChange: handleChange,
  };
  return (
    <div className={cn("float-label", props.className)}>
      {React.cloneElement(props.children, {
        ...childProps,
        ...props.children.props,
      })}
      <label htmlFor={props.for} className={labelClass}>
        {props.label}{" "}
        {props.obligatory && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};
export default FloatLabel;
