import trashBin from "../assets/icons/trashBin.svg";
import attention from "../assets/icons/attentionIcon.svg";
import success from "../assets/icons/successIcon.svg";

type Props = {
  type: string;
  onDelete: () => void;
  onClose: () => void;
};

export default function Modal({ type, onDelete, onClose }: Props) {
  return (
    <div className=" fixed z-100 absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto flex justify-center items-center">
      <div className="lg:w-[604px] w-[328px] bg-[#F2E5CC] lg:rounded-[32px] rounded-[24px] lg:p-[32px] p-[20px] max-h-[520px] justify-center text-center">
        <img
          src={
            type === "delete"
              ? trashBin
              : type === "success"
                ? success
                : attention
          }
          alt=""
          className="mx-auto lg:size-[128px] size-[80px]"
        />
        <div className="mt-[32px]">
          <div className="font-roboto font-bold leading-[100%] tracking-[0px] uppercase text-black-primary lg:text-[40px] text-[24px]">
            {type === "delete"
              ? "Удаление награды"
              : type === "success"
                ? "Сведения успешно отправлены"
                : "Раздел недоступен"}
          </div>
          <div className="w-full px-[10px] mt-[16px] font-roboto font-normal leading-[100%] tracking-[0.28px] text-[#464444] lg:text-[20px] text-[14px] text-center">
            {type === "delete"
              ? "Вы уверены, что хотите удалить награду?"
              : type === "success"
                ? "Сведения о герое были успешно отправлеными в скором времени будут размещены в нашем архиве"
                : type === "svo"
                  ? "Наполнение информации будет доступно после окончания СВО"
                  : "Обратитесь к администратору"}
          </div>
        </div>
        <div className="mt-[20px] lg:mt-[32px] mx-auto left-0 right-0 lg:flex lg:gap-[20px] justify-center">
          <button
            onClick={onClose}
            className={`uppercase font-roboto font-bold leading-[100%] lg:tracking-[2.16px] lg:text-[18px] tracking-[1.68px] text-[16px] lg:w-[260px] w-[288px] lg:h-[64px] h-[64px] lg:rounded-[12px] rounded-[16px] ${type === "delete" ? "bg-beach text-black-primary" : "bg-red-accent text-white"}`}
          >
            {type === "delete" ? "Не удалять" : "Закрыть"}
          </button>
          <button
            onClick={onDelete}
            className="uppercase font-roboto font-bold leading-[100%] lg:tracking-[2.16px] lg:text-[18px] tracking-[1.68px] text-[16px] text-white lg:w-[260px] w-[288px] lg:h-[64px] h-[64px] lg:rounded-[12px] rounded-[16px] bg-red-accent lg:mt-0 mt-[16px]"
            hidden={type !== "delete"}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
