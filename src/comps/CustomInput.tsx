import { useState } from "react";
import { GettingData } from "../types";

type Props = {
  className?: string;
  options: GettingData[];
  handleSelect: (value: string) => void;
  initValue: string;
  unchanged?: boolean;
};

export default function CustomInput({
  className,
  options,
  handleSelect,
  initValue,
  unchanged,
}: Props) {
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [value, setValue] = useState(initValue);

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={() => setOptionsOpen(!isOptionsOpen)}
        className={`${value === initValue || unchanged ? "text-black-third" : "text-black-primary"} relative unselectable w-full h-full select-bg lg:text-[16px] text-[14px] font-normal font-roboto rounded-[12px] flex justify-left items-center text-left lg:px-[20px] px-[12px]`}
      >
        {!unchanged ? value : initValue}
      </div>
      {isOptionsOpen && (
        <div
          className={`bg-beach rounded-[12px] absolute w-full lg:p-[12px] max-h-[300px] p-[4px] overflow-auto mt-[16px] z-1`}
        >
          {options.map((option: GettingData, index: number) => (
            <div
              key={index}
              onClick={() => {
                setValue(option.title);
                handleSelect(option.title);
                setOptionsOpen(false);
              }}
              className={`${option.title === value && !unchanged && "bg-[#80011F0D] text-red-accent font-bold"} mb-[4px] lg:mb-[8px] unselectable h-[34px] lg:h-[45px] p-[12px] text-left flex items-center lg:text-[16px] text-[14px] font-normal font-roboto rounded-[12px] `}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
