import React from "react";

export interface FormAdcProps {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
  className?: string;
}

const FormsAdc = (props: FormAdcProps) => {
  return (
    <div className={props.className}>
      <h1 className={`text-[#F4F4F5] text-2xl mb-3`}>Infomacoes adicionais: (Opcional)</h1>
      <form className="text-[#F4F4F5] flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo1}</span>
            <input type="text" />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo2}</span>
            <input type="number" />
          </label>
        </div>
        <div className="flex justify-beetween gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo3}</span>
            <input type="text" />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo4}</span>
            <input type="number" />
          </label>
        </div>
        <div className="flex justify-beetween gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo5}</span>
            <input type="text" />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo6}</span>
            <input type="text" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default FormsAdc;
