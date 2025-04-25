import { useForm, SubmitHandler } from "react-hook-form";
import questionIcon from "../assets/icons/questionIcon.svg";
import { useEffect, useState } from "react";
import { Award, categoriesList, GettingData, Inputs } from "../types";
import add from "../assets/icons/addIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "./CustomInput";
import addButton from "../assets/icons/addButton.svg";
import trashBin from "../assets/icons/trashBin.svg";
import Hint from "./Hint";

type Props = {
  onSubmitForm: () => void;
  onDeleteAward: () => void;
  onErr: (error: string) => void;
};

export default function Form({ onSubmitForm, onDeleteAward, onErr }: Props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.category === "Герои СВО") {
      onErr("Наполнение информации будет доступно после окончания СВО");
      console.log(data);
      return;
    }
    onSubmitForm();
    console.log(data);
  };

  const [awardsList, setAwardsList] = useState<GettingData[]>([]);
  const [institutionsList, setInstitutionsList] = useState<GettingData[]>([]);
  const [ranksList, setRanksList] = useState<GettingData[]>([]);
  const [archive, setArchive] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [currentCategorie, setCurrentCategorie] = useState<string>();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-memory-admin.itlabs.top/api/hero_awards")
      .then((response) => {
        setAwardsList(response.data);
      });
    axios
      .get("https://book-memory-admin.itlabs.top/api/institutions")
      .then((response) => {
        setInstitutionsList(response.data);
      });
    axios
      .get("https://book-memory-admin.itlabs.top/api/military_ranks")
      .then((response) => {
        setRanksList(response.data);
      });
    setLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:mt-[58px] lg:mt-[48px] mt-[32px]"
        >
          <div className="lg:flex xl:gap-[20px] lg:gap-[24px]">
            <div className="xl:w-[396px] xl:h-[563px] lg:w-[436px] lg:h-[582px] w-[328px] h-[460px]">
              <label>
                <input hidden={true} type="file" className="appearance-none" />
                {images.length === 0 && (
                  <div className="xl:size-[396px] lg:size-[436px] size-[328px] border border-dashed border-black-secondary rounded-[12px] place-content-center text-center">
                    <img src={addButton} alt="add photo" className="mx-auto" />
                    <div className="font-roboto font-normal text-[16px] leading-[100%] tracking-[0px] text-center text-black-secondary mt-[16px]">
                      Перетещите изображение сюда.{" "}
                    </div>
                    <div className="font-roboto font-normal text-[12px] leading-[100%] tracking-[0px] text-center text-black-third mt-[8px]">
                      Рекомендуемый размер фотографии 400х400px
                    </div>
                  </div>
                )}
              </label>
              {/*добавить загруженные фото*/}
              <div className="flex gap-[20px] lg:mt-[20px] mt-[16px]">
                <button
                  disabled={images.length >= 10}
                  className="disabled:bg-[#80011F32] xl:w-[312px] lg:w-[352px] w-[244px] h-[64px] rounded-[12px] bg-red-accent flex uppercase justify-center items-center text-white font-roboto font-bold lg:text-[18px] text-[16px] leading-[100%] lg:tracking-[2.16px] tracking-[1.92px] text-center"
                >
                  Загрузить фото
                </button>
                <button
                  disabled={images.length === 0}
                  onClick={() => {}}
                  className="disabled:opacity-[50%] size-[64px] rounded-[12px] bg-beach flex justify-center items-center"
                >
                  <img src={trashBin} alt="delete" className="" />
                </button>
              </div>
            </div>
            <div className="xl:w-[812px] xl:h-[258px] lg:w-[436px] lg:h-[520px] lg:mt-0 mt-[24px] text-black-primary">
              <div className="xl:flex gap-[20px]">
                <div>
                  <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                    <div className="text-black-primary tracking-[0px]">
                      Фамилия
                    </div>
                    <div className="text-red-accent">*</div>
                  </div>
                  <input
                    placeholder="Константинопольская"
                    autoComplete="off"
                    {...register("surname", { required: true })}
                    className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                  />
                </div>
                <div className="xl:mt-0 lg:mt-[27px] mt-[24px]">
                  <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                    <div className="text-black-primary tracking-[0px]">Имя</div>
                    <div className="text-red-accent">*</div>
                  </div>
                  <input
                    placeholder="Александра"
                    autoComplete="off"
                    {...register("name", { required: true })}
                    className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                  />
                </div>
              </div>
              <div className="xl:flex gap-[20px] xl:mt-[40px] lg:mt-[27px] mt-[24px]">
                <div>
                  <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                    <div className="text-black-primary tracking-[0px]">
                      Отчество
                    </div>
                  </div>
                  <input
                    placeholder="Александровна"
                    autoComplete="off"
                    {...register("patronymic")}
                    className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                  />
                </div>
                <div className="xl:mt-0 lg:mt-[27px] mt-[24px]">
                  <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                    <div className="text-black-primary tracking-[0px]">
                      Место рождения
                    </div>
                  </div>
                  <input
                    placeholder="Ижевск"
                    autoComplete="off"
                    {...register("city")}
                    className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[812px] xl:h-[258px] xl:-mt-[266px] xl:ml-[416px] lg:mt-[32px] mt-[24px] lg:w-[896px] lg:h-[248px] text-black-primary">
            <div className="lg:flex gap-[20px]">
              <div className="">
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold relative">
                  <div className="text-black-primary tracking-[0px]">
                    Категория героя
                  </div>
                  <div className="text-red-accent">*</div>
                  <img
                    src={questionIcon}
                    alt="hint"
                    className={`absolute right-0 top-0 bottom-0 my-auto`}
                  />
                </div>
                <input
                  hidden={true}
                  {...register("category", { required: true })}
                />
                <CustomInput
                  initValue="Герои Великой Отечественнoй войны"
                  handleSelect={(value) => {
                    setValue("category", value);
                    setCurrentCategorie(value);
                  }}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px]"
                  options={categoriesList}
                />
              </div>
              <div className="lg:mt-0 mt-[24px] z-10">
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold relative">
                  <div className="text-black-primary tracking-[0px]">
                    Воинское звание
                  </div>
                  <div className="text-red-accent">*</div>
                  <img
                    src={questionIcon}
                    alt="hint"
                    className={`absolute right-0 top-0 bottom-0 my-auto`}
                  />
                </div>
                <input hidden={true} {...register("militaryRank")} />
                <CustomInput
                  initValue="Майoр"
                  handleSelect={(value) => {
                    setValue("militaryRank", value);
                  }}
                  className="z-[0] xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px]"
                  options={ranksList.filter(
                    (rank) => rank.category === currentCategorie,
                  )}
                />
              </div>
            </div>
            <div className="lg:flex gap-[20px] xl:mt-[40px] lg:mt-[27px] mt-[24px]">
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Дата рождения
                  </div>
                </div>
                <input
                  autoComplete="off"
                  className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
              <div className="lg:mt-0 mt-[24px]">
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Дата смерти
                  </div>
                </div>
                <input
                  autoComplete="off"
                  className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
            </div>
          </div>
          <div className="xl:mt-[32px] mt-[24px]">
            <div className="text-black-primary tracking-[0px] xl:text-[24px] text-[20px] justify-left items-center flex font-roboto leading-[100%] font-bold">
              Дополнительные сведения
              <img
                src={questionIcon}
                alt="hint"
                className={`lg:ml-[32px] ml-[12px]`}
              />
            </div>
            <input
              {...register("additional")}
              autoComplete="off"
              placeholder="Биография и другие сведения"
              className="text-black-primary xl:pl-[20px] pl-[16px] mt-[16px] xl:w-[1228px] lg:w-[896px] w-[328px] xl:h-[128px] lg:h-[128px] h-[128px] border border-black-secondary rounded-[12px] text-start flex justify-left content-start"
            />
          </div>
          <div className="lg:mt-[32px] mt-[24px] xl:w-[1228px] lg:w-[896px] w-[328px]">
            <div className="text-black-primary tracking-[0px] xl:text-[24px] text-[20px] justify-left items-center flex font-roboto leading-[100%] font-bold">
              Материалы архива
            </div>
            <div className="mt-[16px] font-roboto font-normal text-[16px] leading-[100%] tracking-[0px] text-black-primary">
              Можно загрузить до 10 шт. Разрешённые типы файлов: .jpg .png .gif
              .mp4 . Максимальный размер фото: 8 МБ, видео: 100MБ.
            </div>
            <div className="bg-red xl:w-[1228px] lg:w-[896px] w-[328px] lg:h-[144px] h-[128px] xl:mt-[20px] lg:mt-[24px] mt-[16px]" />
          </div>
          <div className="xl:w-[1228px] lg:w-[896px] w-[328px] lg:my-[48px] my-[32px] h-[1px] bg-black-primary" />
          <div className="text-black-primary">
            <div className="w-[328px] lg:w-[896px] font-roboto font-bold xl:text-[40px] text-[32px] leading-[100%] tracking-[0px]">
              Награды героя
            </div>
            <div className="w-[328px] lg:w-[896px] mt-[16px] font-roboto font-normal xl:text-[20px] text-[16px] leading-[100%] tracking-[0px]">
              Заполните информацию о наградах героя
            </div>
            {awards.map((award: Award, index: number) => (
              <div
                key={index}
                className="lg:mt-[32px] mt-[24px] lg:flex bg-[#FCEFD6] rounded-[12px] xl:h-[292px] lg:h-[280px] h-[620px] lg:w-full w-[328px] mb-[16px] lg:mb-[24px] xl:mb-[20px]"
              ></div>
            ))}
            <div className="lg:mt-[32px] mt-[24px] lg:flex bg-[#FCEFD6] rounded-[12px] xl:h-[292px] lg:h-[280px] h-[620px] lg:w-full w-[328px]"></div>
            <button className="lg:w-[396px] w-[328px] h-[64px] rounded-[12px] bg-red-accent float-right lg:mt-[32px] mt-[24px] flex justify-center items-center gap-[16px]">
              <img src={add} alt="add" className="size-[24px]" />
              <div className="text-white font-roboto font-bold lg:text-[18px] text-[16px] leading-[100%] lg:tracking-[2.16px] tracking-[1.92px] text-center uppercase">
                Добавить награду
              </div>
            </button>
          </div>
          <div className=" w-full h-[1px] bg-black-primary mt-[120px] mb-[32px] lg:mt-[136px] lg:mb-[48px]" />
          <div className="text-black-primary">
            <div className="w-[328px] lg:w-[896px] font-roboto font-bold xl:text-[40px] text-[32px] leading-[100%] tracking-[0px]">
              Информация об отправителе
            </div>
            <div className="w-[328px] lg:w-[896px] mt-[16px] font-roboto font-normal xl:text-[20px] text-[16px] leading-[100%] tracking-[0px]">
              Заполните информацию об отправителе
            </div>
            <div className="mt-[24px] lg:mt-[32px] grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-y-[16px] gap-x-[20px]">
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Фамилия
                  </div>
                  <div className="text-red-accent">*</div>
                </div>
                <input
                  autoComplete="off"
                  {...register("surnameSender", { required: true })}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">Имя</div>
                  <div className="text-red-accent">*</div>
                </div>
                <input
                  autoComplete="off"
                  {...register("nameSender", { required: true })}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Отчество
                  </div>
                </div>
                <input
                  autoComplete="off"
                  {...register("patronymicSender")}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Номер телефона
                  </div>
                  <div className="text-red-accent">*</div>
                </div>
                <input
                  autoComplete="off"
                  {...register("phone", { required: true })}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold relative">
                  <div className="text-black-primary tracking-[0px]">
                    Организация
                  </div>
                  <div className="text-red-accent">*</div>
                  <img
                    onMouseEnter={() => {
                      if (document.getElementById("organization") != null) {
                        document.getElementById("organization")!.hidden = false;
                      }
                    }}
                    onMouseLeave={() => {
                      if (document.getElementById("organization") != null) {
                        document.getElementById("organization")!.hidden = true;
                      }
                    }}
                    onClick={() => {
                      if (document.getElementById("organization") != null) {
                        document.getElementById("organization")!.hidden = false;
                        setTimeout(() => {
                          document.getElementById("organization")!.hidden =
                            true;
                        }, 3000);
                      }
                    }}
                    src={questionIcon}
                    alt="hint"
                    className={`absolute right-0 top-0 bottom-0 my-auto`}
                  />
                  <Hint id="organization" text="Lorem Ipsum" />
                </div>
                <input
                  autoComplete="off"
                  {...register("institute", { required: true })}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
              </div>
            </div>
            <div className="lg:flex mt-[24px] lg:mt-[48px] lg:flex-row-reverse mb-[40px] justify-between">
              <button
                type="submit"
                className="lg:w-[396px] w-[328px] h-[64px] rounded-[12px] bg-red-accent flex uppercase justify-center items-center text-white font-roboto font-bold lg:text-[18px] text-[16px] leading-[100%] lg:tracking-[2.16px] tracking-[1.92px] text-center"
              >
                Сохранить
              </button>
              <div className="xl:w-[812px] lg:w-[480px] w-[328px] text-left font-roboto font-normal text-[16px] xl:text-[18px] leading-[100%] tracking-[0px]  lg:mt-0 mt-[16px]">
                <span className="text-black-secondary">
                  Нажимая кнопку "Сохранить" вы подтверждаете&nbsp;
                </span>
                <span
                  onClick={() => navigate("/terms")}
                  className="underline text-red-accent cursor-pointer"
                >
                  согласие на обработку персональных данных
                </span>
              </div>
            </div>
          </div>
        </form>
      )}
      {isLoading && (
        <div className="w-[30px] h-[30px] outline outline-dotted outline-red-accent outline-[10px] rounded-full animate-spin mx-auto mt-[100px]" />
      )}
    </>
  );
}
