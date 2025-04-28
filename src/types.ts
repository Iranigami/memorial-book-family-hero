export interface Award {
  id: number | undefined;
  title: string | null;
  yearAt: string | null;
  description: string | null;
}

export const categoriesList = <GettingData[]>[
  { title: "Герои Великой Отечественной войны" },
  { title: "Труженики тыла" },
  { title: "Герои локальных войн" },
  { title: "Герои - ликвидаторы ЧС" },
  { title: "Герои СВО" },
];

export const DaysList = <GettingData[]>[
  { title: "Нет" },
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" },
  { title: "6" },
  { title: "7" },
  { title: "8" },
  { title: "9" },
  { title: "10" },
  { title: "11" },
  { title: "12" },
  { title: "13" },
  { title: "14" },
  { title: "15" },
  { title: "16" },
  { title: "17" },
  { title: "18" },
  { title: "19" },
  { title: "20" },
  { title: "21" },
  { title: "22" },
  { title: "23" },
  { title: "24" },
  { title: "25" },
  { title: "26" },
  { title: "27" },
  { title: "28" },
  { title: "29" },
  { title: "30" },
  { title: "31" },
];

export const MonthList = <GettingData[]>[
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

export interface GettingData {
  id?: number;
  category?: string;
  title: string;
}

export interface Inputs {
  images: File[];
  name: string;
  surname: string;
  patronymic: string;
  city: string;
  category: string;
  militaryRank: string;
  birthDateAt: string;
  deathDateAt: string;
  additional: string;
  archive: File[];
  heroAward: string;
  nameSender: string;
  surnameSender: string;
  patronymicSender: string;
  phone: string;
  institute: string;
}

export interface Image {}
