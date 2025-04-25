import polygon from "../assets/icons/Polygon.svg";

type Props = {
  text: string;
  id: string;
};

export default function Hint({ text, id }: Props) {
  return (
    <div id={id} hidden={true} className="relative">
      <div className="text-white text-[14px] lg:text-[16px] font-roboto font-normal leading-[100%] tracking-[0px] absolute bg-black-primary lg:p-[24px]  lg:w-[396px] w-[328px] lg:h-[111px] h-[94px] ml-[-187px] mt-[50px] rounded-[12px]">
        {text}
        <img src={polygon} alt="" className="float-right -mt-[40px]" />
      </div>
    </div>
  );
}
