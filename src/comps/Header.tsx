export default function Header() {
  return (
    <div className="mt-[80px] xl:mt-[40px] w-[328px] h-[163px] lg:w-[896px]  xl:w-[1228px] xl:h-[184px] mx-auto justify-center top-0">
      <div className="font-roboto font-bold text-black-primary leading-[100%] tracking-[0px] text-[32px] lg:text-[48px] xl:text-[64px] mx-auto text-left">
        Книга памяти «Герой моей семьи»
      </div>
      <div className="mt-[16px] font-roboto font-normal text-black-primary leading-[100%] tracking-[0px] text-[16px] lg:text-[24px] xl:text-[32px] mx-auto text-left">
        <span>
          Для добавления сведений в наш архив заполните предложенные поля и
          нажмите{" "}
        </span>
        <span className="font-bold text-red-accent">«Сохранить»</span>
      </div>
      <div className="w-full h-[1px] mt-[32px] bg-black-third lg:mt-[48px]" />
    </div>
  );
}
