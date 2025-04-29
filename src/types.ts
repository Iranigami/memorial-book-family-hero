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
