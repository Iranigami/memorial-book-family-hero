import { useForm, SubmitHandler } from "react-hook-form";
import questionIcon from "../assets/icons/questionIcon.svg";
import { useState } from "react";
import { Medal } from "../types";
import add from "../assets/icons/addIcon.svg";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //console.log(watch("example")); // watch input value by passing the name of it

  const [medals, setMedals] = useState<Medal[]>([]);

  return (
    /*       <form onSubmit={handleSubmit(onSubmit)}>
        <input className="bg-black" defaultValue="test" {...register("example")} />
        
        <input className="bg-black" {...register("exampleRequired", { required: true })} />

        {errors.exampleRequired && <span>This field is required</span>}
  
        <input className="bg-black" type="submit" />
      </form> */

    <form className="xl:mt-[58px] lg:mt-[48px] mt-[32px]">
      <div className="lg:flex xl:gap-[20px] lg:gap-[24px]">
        <div className="xl:w-[396px] xl:h-[563px] lg:w-[436px] lg:h-[582px] w-[328px] h-[460px] bg-black">
          фото блок
        </div>
        <div className="xl:w-[812px] xl:h-[258px] lg:w-[436px] lg:h-[520px] lg:mt-0 mt-[24px]">
          <div className="xl:flex gap-[20px]">
            <div>
              <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                <div className="text-black-primary tracking-[0px]">Фамилия</div>
                <div className="text-red-accent">*</div>
              </div>
              <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
            </div>
            <div className="xl:mt-0 lg:mt-[27px] mt-[24px]">
              <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                <div className="text-black-primary tracking-[0px]">Имя</div>
                <div className="text-red-accent">*</div>
              </div>
              <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
            </div>
          </div>
          <div className="xl:flex gap-[20px] xl:mt-[40px] lg:mt-[27px] mt-[24px]">
            <div>
              <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                <div className="text-black-primary tracking-[0px]">
                  Отчество
                </div>
              </div>
              <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
            </div>
            <div className="xl:mt-0 lg:mt-[27px] mt-[24px]">
              <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
                <div className="text-black-primary tracking-[0px]">
                  Место рождения
                </div>
              </div>
              <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[812px] xl:h-[258px] xl:-mt-[266px] xl:ml-[416px] lg:mt-[32px] mt-[24px] lg:w-[896px] lg:h-[248px]">
        <div className="lg:flex gap-[20px]">
          <div>
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
            <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
          </div>
          <div className="lg:mt-0 mt-[24px]">
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
            <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
          </div>
        </div>
        <div className="lg:flex gap-[20px] xl:mt-[40px] lg:mt-[27px] mt-[24px]">
          <div>
            <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
              <div className="text-black-primary tracking-[0px]">
                Дата рождения
              </div>
            </div>
            <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
          </div>
          <div className="lg:mt-0 mt-[24px]">
            <div className="gap-[16px] xl:text-[24px] text-[20px] justify-left flex font-roboto leading-[100%] font-bold">
              <div className="text-black-primary tracking-[0px]">
                Дата смерти
              </div>
            </div>
            <input className="xl:w-[396px] lg:w-[436px] w-[328px] lg:h-[61px] h-[58px] mt-[16px] text-[16px] font-normal font-roboto rounded-[12px] flex justify-center items-center text-left lg:pl-[20px] pl-[12px] border border-black-secondary" />
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
          placeholder="Биография и другие сведения"
          className="text-black-primary xl:pl-[20px] pl-[16px] mt-[16px] xl:w-[1228px] lg:w-[896px] w-[328px] xl:h-[128px] lg:h-[128px] h-[128px] border border-black-secondary rounded-[12px] text-start break-all items-start"
        />
      </div>
      <div className="lg:mt-[32px] mt-[24px] xl:w-[1228px] lg:w-[896px] w-[328px]">
        <div className="text-black-primary tracking-[0px] xl:text-[24px] text-[20px] justify-left items-center flex font-roboto leading-[100%] font-bold">
          Материалы архива
        </div>
        <div className="mt-[16px] font-roboto font-normal text-[16px] leading-[100%] tracking-[0px] text-black-primary">
          Можно загрузить до 10 шт. Разрешённые типы файлов: .jpg .png .gif .mp4
          . Максимальный размер фото: 8 МБ, видео: 100MБ.
        </div>
        <div className="bg-red xl:w-[1228px] lg:w-[896px] w-[328px] lg:h-[144px] h-[128px] xl:mt-[20px] lg:mt-[24px] mt-[16px]" />
      </div>
      <div className="xl:w-[1228px] lg:w-[896px] w-[328px] lg:my-[48px] my-[32px] h-[1px] bg-black-primary" />
      <div className="text-black-primary">
        <div className="font-roboto font-bold xl:text-[40px] text-[32px] leading-[100%] tracking-[0px]">
          Награды героя
        </div>
        <div className="mt-[16px] font-roboto font-normal xl:text-[20px] text-[16px] leading-[100%] tracking-[0px]">
          Заполните информацию о наградах героя
        </div>
        <></> {/*вставить добавленные награды*/}
        <div className="lg:mt-[32px] mt-[24px] lg:flex bg-[#FCEFD6] rounded-[12px] xl:h-[292px] lg:h-[280px] h-[620px] lg:w-full w-[328px]"></div>
        <button className="lg:w-[396px] w-[328px] h-[64px] rounded-[12px] bg-red-accent xl:ml-[832px] lg:ml-[500px] lg:mt-[32px] mt-[24px] flex justify-center items-center gap-[16px]">
          <img src={add} alt="add" className="size-[24px]" />
          <div className="text-white font-roboto font-bold lg:text-[18px] text-[16px] leading-[100%] lg:tracking-[2.16px] tracking-[1.92px] text-center uppercase">
            Добавить награду
          </div>
        </button>
      </div>
    </form>
  );
}
