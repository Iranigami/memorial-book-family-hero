import { useRef } from "react";
import CustomInput from "./CustomInput";
import { GettingData } from "../types";

const months = [
  { title: "Нет" },
  { title: "Январь" },
  { title: "Февраль" },
  { title: "Март" },
  { title: "Апрель" },
  { title: "Май" },
  { title: "Июнь" },
  { title: "Июль" },
  { title: "Август" },
  { title: "Сентябрь" },
  { title: "Октябрь" },
  { title: "Ноябрь" },
  { title: "Декабрь" },
];

const days: GettingData[] = [{ title: "Нет" }];

for (let i = 1; i <= 31; i++) days.push({ title: String(i) });

const years: GettingData[] = [];

for (let i = 2025; i > 1850; i--) years.push({ title: String(i) });

type Props = {
  setDate: (date: string) => void;
};

export default function DatePicker({ setDate }: Props) {
  const formatDate = (totalDate: {
    day: string;
    month: string;
    year: string;
  }) => {
    if (!totalDate.month || totalDate.month === "Нет") {
      return totalDate.year;
    } else if (!totalDate.day || totalDate.day === "Нет")
      return totalDate.month + ", " + totalDate.year;
    else {
      var formattedMonth = totalDate.month.toLowerCase();
      formattedMonth = formattedMonth.replace("ь", "я");
      formattedMonth = formattedMonth.replace("й", "я");
      if (formattedMonth[formattedMonth.length - 1] !== "я")
        formattedMonth = formattedMonth.concat("a");
      return totalDate.day + " " + formattedMonth + " " + totalDate.year;
    }
  };
  const currentDate = useRef({ day: "", month: "", year: "" });
  return (
    <div className="flex gap-[8px] mt-[16px] relative">
      <CustomInput
        options={days}
        handleSelect={(day) => {
          currentDate.current.day = day;
          setDate(formatDate(currentDate.current));
        }}
        initValue={"День"}
        className="lg:w-[106px] w-[87px] h-[64px] border border-black-secondary rounded-[12px]"
      />
      <CustomInput
        options={months}
        handleSelect={(month) => {
          currentDate.current.month = month;
          setDate(formatDate(currentDate.current));
        }}
        initValue={"Месяц"}
        className="xl:w-[158px] lg:w-[190px] w-[125px] lg:h-[64px] border border-black-secondary rounded-[12px]"
      />
      <CustomInput
        options={years}
        handleSelect={(year) => {
          currentDate.current.year = year;
          setDate(formatDate(currentDate.current));
        }}
        initValue={"Год"}
        className="xl:w-[116px] lg:w-[124px] w-[100px] lg:h-[64px] border border-black-secondary rounded-[12px]"
      />
    </div>
  );
}
