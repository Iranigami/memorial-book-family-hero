import { useNavigate } from "react-router-dom";
import back from "../assets/icons/back.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Terms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://book-memory-admin.itlabs.top/api/personal_data_accepts`;
    axios.get(apiUrl).then((response) => {
      document.getElementById("text")!.innerHTML = response.data.description;
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-[328px] lg:w-[896px] xl:w-[1228px] mt-[40px]">
      <div className="flex justify-between items-center">
        <button
          className="font-roboto font-bold leading-[100%] tracking-[0px] uppercase xl:w-[188px] xl:h-[64px] xl:rounded-[12px] lg:w-[141px] lg:h-[48px] lg:rounded-[9px] rounded-[6px] w-[120px] h-[32px] bg-red-accent flex justify-center items-center xl:gap-[16px] lg:gap-[12px] gap-[8px] xl:text-[18px] lg:text-[13.5px] text-[9px]"
          onClick={() => navigate("/")}
        >
          <img
            src={back}
            alt="back"
            className="xl:size-[24px] lg:size-[18px] size-[12px]"
          />
          Назад
        </button>
        <div className="text-right text-black-primary font-roboto leading-[100%] tracking-[0px] font-bold xl:text-[40px] lg:text-[30px] text-[20px]">
          Согласие на обработку персональных данных
        </div>
      </div>
      <div
        id="text"
        className="font-roboto text-black-primary font-normal leading-[100%] tracking-[0px] mt-[32px] lg:text-[20px] text-[12px]"
      ></div>
    </div>
  );
}
