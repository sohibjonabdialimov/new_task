import React from "react";
import left from "../assets/img/left.svg";
import code from "../assets/img/code.svg";

const AllOrders = () => {
  return (
    <div className="w-[20vw] h-[100dvh]">
      <div className="flex items-center justify-between h-[70px] pr-[15px] pl-[25px] border">
        <h2 className="uppercase font-bold text-[26px]">task project</h2>
        <button className="block bg-slate-300 rounded p-1">
          <img src={left} alt="" />
        </button>
      </div>
      <div
        style={{ color: "#7792BB",}}
        className="flex gap-4 py-[20px] pr-[10px] pl-[35px]"
      >
        <img src={code} alt="" />
        <h3 className="font-medium text-[20px]">Все заказы</h3>
      </div>
    </div>
  );
};

export default AllOrders;
