import polygon from "../assets/icons/Polygon.svg";

type Props = {
  text: string;
  id: string;
  className?: string;
};

export default function Hint({ text, id, className }: Props) {
  return (
    <div
      id={id}
      hidden={true}
      className={`relative z-100 ${className} xl:ml-0 lg:ml-[70px] ml-[15px]`}
    >
      <div className="text-white text-[14px] lg:text-[16px] font-roboto font-normal leading-[100%] tracking-[0px] absolute bg-black-primary lg:p-[24px] p-[12px] lg:w-[396px] w-[328px] lg:h-[111px] h-[94px] ml-[-187px] mt-[50px] rounded-[12px]">
        {text}
        <img
          src={polygon}
          alt=""
          className="float-right lg:-mt-[40px] -mt-[28px]"
        />
      </div>
    </div>
  );
}
