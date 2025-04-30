import { useForm, SubmitHandler } from "react-hook-form";
import questionIcon from "../assets/icons/questionIcon.svg";
import { useEffect, useRef, useState } from "react";
import { Award, categoriesList, GettingData, Inputs } from "../types";
import add from "../assets/icons/addIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "./CustomInput";
import addButton from "../assets/icons/addButton.svg";
import trashBin from "../assets/icons/trashBin.svg";
import Hint from "./Hint";
import arrNext from "../assets/icons/arrNext.svg";
import closeIcon from "../assets/icons/closeIcon.svg";
import video from "../assets/icons/video.svg";
import DatePicker from "./DatePicker";
import Modal from "./Modal";
import IMask from "imask";

export default function Form() {
  const resetForm = () => {
    setImages([]);
    setAwards([]);
    setArchive([]);
    currentAward.current = {
      id: 0,
      title: null,
      yearAt: "",
      description: "",
    };
    setAwardInput(true);
    setShownImage(0);
    setAwardError(false);
    setResetBirthDate(true);
    setResetDeathDate(true);
    setResetCategoryInput(true);
    setResetRankInput(true);
    setResetInstituteInput(true);
    reset();
  }
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.heroAward = JSON.stringify(currentAward.current.title === null ? awards : [...awards, currentAward.current]);
    data.archive = archive;
    data.images = images;


    if (data.category === "Герои СВО") {
      setModalType("Наполнение информации будет доступно после окончания СВО");
      setModalOpen(true);
      return;
    }
    axios
      .post(`${apiUrl}application_forms/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function () {
        resetForm();
        setModalType("success");
        setModalOpen(true);
      })
      .catch(function (error) {
        setModalType(error.message);
        setModalOpen(true);
      });

  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [awardsList, setAwardsList] = useState<GettingData[]>([]);
  const currentAward = useRef<Award>({
    id: 0,
    title: null,
    yearAt: "",
    description: "",
  });
  const [shownImage, setShownImage] = useState(0);
  const [institutionsList, setInstitutionsList] = useState<GettingData[]>([]);
  const [ranksList, setRanksList] = useState<GettingData[]>([]);
  const [archive, setArchive] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [awardInput, setAwardInput] = useState(false); //for reset award input
  const [resetCategoryInput, setResetCategoryInput] = useState(false); 
  const [resetRankInput, setResetRankInput] = useState(false); 
  const [resetInstituteInput, setResetInstituteInput] = useState(false); 
  const [resetBirthDate, setResetBirthDate] = useState(false); 
  const [resetDeathDate, setResetDeathDate] = useState(false); 
  const [awardError, setAwardError] = useState(false);
  const deleteId = useRef<number | null>(null);
  const phoneInput = document.getElementById("phone") as HTMLInputElement; 
  if (phoneInput)
  {
    IMask(phoneInput, {
      mask: '+{7} (000) 000-00-00'
    });
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}hero_awards`).then((response) => {
      setAwardsList(response.data);
    });
    axios.get(`${apiUrl}institutions`).then((response) => {
      setInstitutionsList(response.data);
    });
    axios.get(`${apiUrl}military_ranks`).then((response) => {
      setRanksList(response.data);
    });
    setLoading(false);
  }, []);
  

  return (
    <>
      {isLoading && (
        <div className="w-[50px] h-[50px] outline outline-dotted outline-black-third outline-[10px] rounded-full animate-spin absolute left-0 right-0 mx-auto mt-[180px]" />
      )}
      {!isLoading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:mt-[58px] lg:mt-[48px] mt-[32px]"
        >
          <div className="lg:flex xl:gap-[20px] lg:gap-[24px]">
            <div className="xl:w-[396px] xl:h-[563px] lg:w-[436px] lg:h-[582px] w-[328px] h-[460px]">
              <label>
                <input
                  accept=".png, .jpg"
                  hidden={false}
                  id="imgInput"
                  type="file"
                  className="xl:size-[396px] lg:size-[436px] size-[328px] absolute opacity-0"
                  onChange={(event) => {
                    if (
                      event.target.files &&
                      event.target.files[0].size > 8388608
                    )
                      alert("Слишком большой файл");
                    else
                      setImages((prevImages) => [
                        ...prevImages,
                        ...Array.from(event.target.files!),
                      ]);
                  }}
                />
                {images.length === 0 && (
                  <div className="xl:size-[396px] lg:size-[436px] size-[328px] border border-dashed border-black-secondary rounded-[12px] place-content-center text-center">
                    <img src={addButton} alt="add photo" className="mx-auto" />
                    <div className="font-roboto font-normal text-[16px] leading-[100%] tracking-[0px] text-center text-black-secondary mt-[16px]">
                      Перетещите изображение сюда.
                    </div>
                    <div className="font-roboto font-normal text-[12px] leading-[100%] tracking-[0px] text-center text-black-third mt-[8px]">
                      Рекомендуемый размер фотографии 400х400px
                    </div>
                  </div>
                )}
              </label>
              {images.length !== 0 && (
                <div className="xl:size-[396px] lg:size-[436px] size-[328px] rounded-[12px] place-content-center text-center flex relative overflow-clip">
                  <button
                    type="button"
                    className={`size-[48px] disabled:opacity-[50%] absolute left-0 flex justify-center items-center top-0 bottom-0 my-auto`}
                    disabled={shownImage === 0}
                    onClick={() => {
                      setShownImage(shownImage - 1);
                    }}
                  >
                    <img src={arrNext} alt="prev" />
                  </button>
                  <img
                    src={URL.createObjectURL(images[shownImage])}
                    className="object-contain"
                  />
                  <button
                    type="button"
                    className={`size-[48px] disabled:opacity-[50%] absolute right-0 flex justify-center items-center top-0 bottom-0 my-auto`}
                    disabled={shownImage === images.length - 1}
                    onClick={() => {
                      setShownImage(shownImage + 1);
                    }}
                  >
                    <img src={arrNext} alt="prev" className="rotate-180" />
                  </button>
                </div>
              )}
              <div className="flex gap-[20px] lg:mt-[20px] mt-[16px]">
                <button
                  onClick={() => {
                    document.getElementById("imgInput")?.click();
                  }}
                  type="button"
                  disabled={images.length >= 10}
                  className="disabled:bg-[#80011F32] xl:w-[312px] lg:w-[352px] w-[244px] h-[64px] rounded-[12px] bg-red-accent flex uppercase justify-center items-center text-white font-roboto font-bold lg:text-[18px] text-[16px] leading-[100%] lg:tracking-[2.16px] tracking-[1.92px] text-center"
                >
                  Загрузить фото
                </button>
                <button
                  type="button"
                  disabled={images.length === 0}
                  onClick={() => {
                    setImages(images.filter((_, idx) => idx !== shownImage));
                    if (shownImage !== 0) setShownImage(shownImage - 1);
                  }}
                  className="disabled:opacity-[50%] size-[64px] rounded-[12px] bg-beach flex justify-center items-center"
                >
                  <img src={trashBin} alt="delete" className="" />
                </button>
              </div>
              <div className="font-roboto font-normal lg:text-[16px] text-[14px] leading-[100%] tracking-[0px] text-black-secondary mt-[20px]">
                Можно загрузить до 10 шт. Разрешённые типы файлов: .jpg .png .
                Максимальный размер фото: 8 МБ
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
                    className={`xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border ${errors.surname ? "border-red" : "border-black-secondary"}`}
                  />
                  {errors.surname && (
                    <div className="font-roboto font-normal text-[12px] text-red">
                      Поле обязательно к заполнению
                    </div>
                  )}
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
                    className={`xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border ${errors.name ? "border-red" : "border-black-secondary"}`}
                  />
                  {errors.name && (
                    <div className="font-roboto font-normal text-[12px] text-red">
                      Поле обязательно к заполнению
                    </div>
                  )}
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
                    onMouseEnter={() => {
                      if (document.getElementById("category") != null) {
                        document.getElementById("category")!.hidden = false;
                      }
                    }}
                    onMouseLeave={() => {
                      if (document.getElementById("category") != null) {
                        document.getElementById("category")!.hidden = true;
                      }
                    }}
                    onClick={() => {
                      if (document.getElementById("category") != null) {
                        document.getElementById("category")!.hidden = false;
                        setTimeout(() => {
                          document.getElementById("category")!.hidden = true;
                        }, 3000);
                      }
                    }}
                    src={questionIcon}
                    alt="hint"
                    className={`absolute right-0 top-0 bottom-0 my-auto`}
                  />
                  <Hint
                    id="category"
                    text="Lorem Ipsum"
                    className="translate-x-[-35px]"
                  />
                </div>
                <input
                  hidden={true}
                  {...register("category", { required: true })}
                />

                <CustomInput
                  unchanged={resetCategoryInput}
                  initValue="Герои Великой Отечественнoй войны"
                  handleSelect={(value) => {
                    setResetCategoryInput(false);
                    setValue("category", value);
                    setCurrentCategory(value);
                  }}
                  className={`xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] ${errors.category ? "border-red border rounded-[12px]" : "rounded-[12px] border border-black-secondary"}`}
                  options={categoriesList}
                />
                {errors.category && (
                  <div className="font-roboto font-normal text-[12px] text-red">
                    Поле обязательно к заполнению
                  </div>
                )}
              </div>
              <div className="lg:mt-0 mt-[24px] z-1">
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold relative">
                  <div className="text-black-primary tracking-[0px]">
                    Воинское звание
                  </div>
                  <img
                    onMouseEnter={() => {
                      if (document.getElementById("rank") != null) {
                        document.getElementById("rank")!.hidden = false;
                      }
                    }}
                    onMouseLeave={() => {
                      if (document.getElementById("rank") != null) {
                        document.getElementById("rank")!.hidden = true;
                      }
                    }}
                    onClick={() => {
                      if (document.getElementById("rank") != null) {
                        document.getElementById("rank")!.hidden = false;
                        setTimeout(() => {
                          document.getElementById("rank")!.hidden = true;
                        }, 3000);
                      }
                    }}
                    src={questionIcon}
                    alt="hint"
                    className={`absolute right-0 top-0 bottom-0 my-auto`}
                  />
                  <Hint
                    id="rank"
                    text="Lorem Ipsum"
                    className="xl:translate-x-[-15px] translate-x-[-10px]"
                  />
                </div>
                <input hidden={true} {...register("militaryRank")} />
                <CustomInput
                  unchanged={resetRankInput}
                  initValue="Майoр"
                  handleSelect={(value) => {
                    setResetRankInput(false);
                    setValue("militaryRank", value);
                  }}
                  className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] rounded-[12px] border border-black-secondary"
                  options={ranksList.filter(
                    (rank) => rank.category === currentCategory,
                  )}
                />
              </div>
            </div>
            <div className="lg:flex gap-[20px] xl:mt-[40px] lg:mt-[27px] mt-[24px]">
              <div className="">
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Дата рождения
                  </div>
                </div>
                <input
                  hidden={true}
                  autoComplete="off"
                  className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
                <DatePicker reset={resetBirthDate} setDate={(date) => {setValue("birthDateAt", date); setResetBirthDate(false);}} />
              </div>
              <div className="lg:mt-0 mt-[24px]">
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Дата смерти
                  </div>
                </div>
                <input
                  hidden={true}
                  autoComplete="off"
                  className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                />
                <DatePicker reset={resetDeathDate} setDate={(date) => {setValue("deathDateAt", date); setResetDeathDate(false);}} />
              </div>
            </div>
          </div>
          <div className="xl:mt-[32px] mt-[24px]">
            <div className="text-black-primary tracking-[0px] xl:text-[24px] text-[20px] justify-left items-center flex font-roboto leading-[100%] font-bold">
              Дополнительные сведения
              <img
                onMouseEnter={() => {
                  if (document.getElementById("desc") != null) {
                    document.getElementById("desc")!.hidden = false;
                  }
                }}
                onMouseLeave={() => {
                  if (document.getElementById("desc") != null) {
                    document.getElementById("desc")!.hidden = true;
                  }
                }}
                onClick={() => {
                  if (document.getElementById("desc") != null) {
                    document.getElementById("desc")!.hidden = false;
                    setTimeout(() => {
                      document.getElementById("desc")!.hidden = true;
                    }, 3000);
                  }
                }}
                src={questionIcon}
                alt="hint"
                className={`lg:ml-[32px] ml-[12px]`}
              />
              <Hint
                id="desc"
                text="Lorem Ipsum"
                className="xl:translate-x-[-190px] lg:translate-x-[-260px] translate-x-[-150px] mt-[-30px]"
              />
            </div>
            <input
              {...register("additional")}
              autoComplete="off"
              placeholder="Биография и другие сведения"
              className="font-roboto font-normal text-black-primary xl:pl-[20px] pl-[16px] mt-[16px] xl:w-[1228px] lg:w-[896px] w-[328px] xl:h-[128px] lg:h-[128px] h-[128px] border border-black-secondary rounded-[12px] text-start flex justify-left content-start"
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
            <div className="flex flex-nowrap xl:w-[1228px] lg:w-[896px] w-[328px] lg:h-[160px] h-[144px] xl:mt-[4px] lg:mt-[8px] gap-[24px] justify-left items-center overflow-x-auto">
              <label className="shrink-0 lg:size-[144px] size-[128px] border-dashed border border-black-primary rounded-[12px] flex justify-center items-center mt-[16px]">
                <input
                  accept=".png, .jpg, .gif, .mp4"
                  disabled={archive.length >= 10}
                  hidden={true}
                  id="archiveInput"
                  type="file"
                  className="appearance-none"
                  onChange={(event) => {
                    const file = event.target.files![0];
                    if (
                      file &&
                      (file.size > 104857600 ||
                        (file.type !== "video/mp4" && file.size > 8388608))
                    )
                      alert("Слишком большой файл");
                    else
                      setArchive((prevArchive) => [
                        ...prevArchive,
                        ...Array.from(event.target.files!),
                      ]);
                  }}
                />
                <img
                  src={addButton}
                  alt="add"
                  className={`size-[64px] ${archive.length >= 10 && "opacity-[50%]"}`}
                />
              </label>
              {archive.map((memory: File, index: number) => (
                <div
                  key={index}
                  className="mt-[16px] shrink-0 relative lg:size-[144px] size-[128px] rounded-[12px] place-content-center text-center flex relative"
                >
                  <img
                    src={
                      memory.type === "video/mp4"
                        ? video
                        : URL.createObjectURL(memory)
                    }
                    className="object-fit  lg:w-[144px] w-[128px] rounded-[12px]"
                  />
                  <button
                    onClick={() => {
                      setArchive(archive.filter((_, idx) => idx !== index));
                    }}
                    type="button"
                    className="absolute size-[32px] right-[-16px] top-[-16px]"
                  >
                    <img src={closeIcon} alt="close" />
                  </button>
                </div>
              ))}
            </div>
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
                className="lg:mt-[32px] mt-[24px] lg:flex  items-start justify-between bg-[#FCEFD6] rounded-[12px] xl:h-[292px] lg:h-[280px] h-[620px] lg:w-full w-[328px] xl:gap-[20px] lg:gap-[24px] lg:p-[24px] p-[16px]"
              >
                <div className="flex inline xl:w-[500px] xl:h-[244px] lg:w-[300px] lg:h-[248px] w-[296px] h-[240px]">
                  <div className="w-full xl:text-[24px] text-[20px] justify-left font-roboto leading-[100%] font-bold">
                    <span className="text-black-primary tracking-[0px]">
                      Название награды
                    </span>
                    <span className="text-red-accent">&nbsp; &nbsp;*</span>
                    <div className="xl:w-[500px] lg:w-[300px] w-[296px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-left items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary">
                      {award.title}
                    </div>
                    <div className="text-black-primary tracking-[0px] mt-[20px]">
                      Год выдачи награды
                    </div>
                    <div className="xl:w-[500px] lg:w-[300px] w-[296px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-left items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary">
                      {award.yearAt}
                    </div>
                  </div>
                </div>
                <div className="xl:w-[544px] xl:h-[244px] lg:w-[436px] lg:h-[248px] w-[296px] h-[236px] font-roboto font-normal lg:mt-[-10px] mt-[16px]">
                  <div className="text-black-primary tracking-[0px] xl:text-[24px] text-[20px] font-bold">
                    Описание боевого подвига или заслуги
                  </div>
                  <div className="w-full mt-[16px] lg:h-[200px] h-[168px] border border-black-primary rounded-[12px] p-[16px] text-start">
                    {award.description}
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteId.current = index;
                    setModalType("delete");
                    setModalOpen(true);
                  }}
                  type="button"
                  className="bg-[#FFF9E0] opacity-[100%] lg:w-[80px] lg:h-[244px] w-[296px] h-[80px] lg:mt-[0px] mt-[26px] rounded-[12px] flex justify-center items-center"
                >
                  <img src={trashBin} alt="delete" className="" />
                </button>
              </div>
            ))}
            <div className="lg:mt-[32px] mt-[24px] lg:flex  items-start justify-between bg-[#FCEFD6] rounded-[12px] xl:h-[292px] lg:h-[280px] h-[620px] lg:w-full w-[328px] xl:gap-[20px] lg:gap-[24px] lg:p-[24px] p-[16px]">
              <div className="flex inline xl:w-[500px] xl:h-[244px] lg:w-[300px] lg:h-[248px] w-[296px] h-[240px]">
                <div className="w-full xl:text-[24px] text-[20px] justify-left font-roboto leading-[100%] font-bold">
                  <span className="text-black-primary tracking-[0px]">
                    Название награды
                  </span>
                  <span className="text-red-accent">&nbsp; &nbsp;*</span>
                  <CustomInput
                    unchanged={awardInput}
                    initValue="Кpасная звездa"
                    handleSelect={(value) => {
                      setAwardInput(false);
                      currentAward.current.title = value;
                    }}
                    className={`xl:w-[500px] lg:w-[300px] w-[296px] lg:h-[61px] h-[58px] lg:mt-[24px] mt-[16px] rounded-[12px] ${awardError ? "border border-red" : "border border-black-primary"}`}
                    options={awardsList.filter(
                      (award) => award.category === currentCategory,
                    )}
                  />
                  <div className="text-black-primary tracking-[0px] mt-[20px]">
                    Год выдачи награды
                  </div>
                  <input
                    id="awardYear"
                    placeholder="1945"
                    onChange={(event) => {
                      currentAward.current.yearAt = event.target.value;
                    }}
                    className="xl:w-[500px] lg:w-[300px] w-[296px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary"
                  />
                </div>
              </div>
              <div className="xl:w-[544px] xl:h-[244px] lg:w-[436px] lg:h-[248px] w-[296px] h-[236px] font-roboto font-normal lg:mt-[-10px] mt-[16px]">
                <div className="text-black-primary tracking-[0px] xl:text-[24px] text-[20px] font-bold">
                  Описание боевого подвига или заслуги
                </div>
                <input
                  id="awardDesc"
                  onChange={(event) => {
                    currentAward.current.description = event.target.value;
                  }}
                  placeholder="Дополнительные сведения"
                  className="w-full mt-[16px] lg:h-[200px] h-[168px] border border-black-primary rounded-[12px] p-[16px] text-start "
                />
              </div>
              <button
                type="button"
                disabled={true}
                className="bg-[#FFF9E0] opacity-[50%] lg:w-[80px] lg:h-[244px] w-[296px] h-[80px] lg:mt-[0px] mt-[26px] rounded-[12px] flex justify-center items-center"
              >
                <img src={trashBin} alt="delete" className="" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                if (currentAward.current.title === null) setAwardError(true);
                else {
                  setAwardInput(true);
                  (
                    document.getElementById("awardDesc") as HTMLInputElement
                  ).value = "";
                  (
                    document.getElementById("awardYear") as HTMLInputElement
                  ).value = "";
                  currentAward.current.id = awards.length;
                  setAwards([...awards, currentAward.current]);
                  currentAward.current = {
                    id: undefined,
                    title: null,
                    yearAt: "",
                    description: "",
                  };
                  setAwardError(false);
                }
              }}
              className="lg:w-[396px] w-[328px] h-[64px] rounded-[12px] bg-red-accent float-right lg:mt-[32px] mt-[24px] flex justify-center items-center gap-[16px]"
            >
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
                  placeholder="Романов"
                  autoComplete="off"
                  {...register("surnameSender", { required: true })}
                  className={`${errors.surnameSender ? "border-red" : "border-black-secondary"} xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border`}
                />
                {errors.surnameSender && (
                  <div className="font-roboto font-normal text-[12px] text-red">
                    Поле обязательно к заполнению
                  </div>
                )}
              </div>
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">Имя</div>
                  <div className="text-red-accent">*</div>
                </div>
                <input
                  placeholder="Иван"
                  autoComplete="off"
                  {...register("nameSender", { required: true })}
                  className={`${errors.nameSender ? "border-red" : "border-black-secondary"} xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border`}
                />
                {errors.nameSender && (
                  <div className="font-roboto font-normal text-[12px] text-red">
                    Поле обязательно к заполнению
                  </div>
                )}
              </div>
              <div>
                <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                  <div className="text-black-primary tracking-[0px]">
                    Отчество
                  </div>
                </div>
                <input
                  autoComplete="off"
                  placeholder="Иванович"
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
                  id="phone"
                  type="tel"
                  placeholder="+7 (912) 999 99-99"
                  autoComplete="off"
                  {...register("phone", { required: true })}
                  className={`${errors.phone ? "border-red" : "border-black-secondary"} phone xl:w-[396px] lg:w-[436px] w-[328px] h-[64px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border`}
                />
                {errors.phone && (
                  <div className="font-roboto font-normal text-[12px] text-red">
                    Поле обязательно к заполнению
                  </div>
                )}
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
                  hidden={true}
                />
                <CustomInput
                  unchanged={resetInstituteInput}
                  initValue="Название организации"
                  handleSelect={(value) => {
                    setResetInstituteInput(false);
                    setValue("institute", value);
                  }}
                  className={`z-[0] xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] rounded-[12px] ${errors.institute ? "border border-red" : "border border-black-primary"}`}
                  options={institutionsList}
                />
                {errors.institute && (
                  <div className="font-roboto font-normal text-[12px] text-red">
                    Поле обязательно к заполнению
                  </div>
                )}
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
        <div className="w-[30px] h-[30px] border border-dotted border-red-accent border-[10px] rounded-full animate-spin mx-auto mt-[100px]" />
      )}

      <div
        hidden={!isModalOpen}
        className="z-10 bg-black opacity-[60%] w-[100vw] h-[100vh] fixed top-0 left-0"
      />
      {isModalOpen && (
        <Modal
          type={modalType}
          onClose={() => setModalOpen(false)}
          onDelete={() => {
            setAwards(awards.filter((_, idx) => idx !== deleteId.current));
            setModalOpen(false);
            deleteId.current = null;
          }}
        />
      )}
    </>
  );
}
