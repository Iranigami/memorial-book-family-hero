import { useState } from "react";
import CustomInput from "./CustomInput";

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const years = Array.from({ length: 111 }, (_, i) => ({
  title: `${new Date().getFullYear() - 100 + i}`,
}));

// Функция для определения количества дней в заданном месяце/году
const getDaysInMonth = (year: number, monthIndex: number) => {
  const lastDayOfNextMonth = new Date(year, monthIndex + 1, 0); // Дата следующего месяца 0-го числа даст кол-во дней предыдущего месяца
  return lastDayOfNextMonth.getDate(); // Возвращаем количество дней
};

// Генерируем дни конкретного месяца
const generateDaysForMonth = (year: number, monthTitle: string) => {
  const monthIndex = months.indexOf(monthTitle); // Индекс месяца
  if (monthIndex === -1) return [];
  const numberOfDays = getDaysInMonth(year, monthIndex); // Определяем количество дней
  return Array.from({ length: numberOfDays }, (_, i) => ({
    title: `${i + 1}`,
  }));
};

export default function DatePicker() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(0);

  const days = year && month ? generateDaysForMonth(year, month) : []; // Динамическое формирование дней
  const availableMonths = months.map((m) => ({ title: m }));

  return (
    <div className="flex gap-[8px]">
      <CustomInput
        className=""
        options={days}
        handleSelect={(selected) => setDay(selected.title)}
        initValue="День"
      />
      <CustomInput
        className=""
        options={availableMonths}
        handleSelect={(selected) => {
          setMonth(selected.title);
          setDay(null);
        }} // Меняем месяц
        initValue={"Месяц"}
      />
      <CustomInput
        className=""
        options={years}
        handleSelect={(selected) => {
          setYear(parseInt(selected.title));
          setDay(null);
        }} // Сохраняем числовой год
        initValue={"Год"}
      />
    </div>
  );
}
