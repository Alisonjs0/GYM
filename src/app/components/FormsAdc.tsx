import React, { useState } from "react";

export interface FormAdcProps {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
  className?: string;

  objt: string;
  setObjt: React.Dispatch<React.SetStateAction<string>>;
  altura: string;
  setAltura: React.Dispatch<React.SetStateAction<string>>;
  exp: string;
  setExp: React.Dispatch<React.SetStateAction<string>>;
  peso: string;
  setPeso: React.Dispatch<React.SetStateAction<string>>;
  condicoes: string;
  setCondicoes: React.Dispatch<React.SetStateAction<string>>;
  indicacao: string;
  setIndicacao: React.Dispatch<React.SetStateAction<string>>;
}

const FormsAdc = (props: FormAdcProps) => {
    // Informacoes opcionais

  return (
    <div className={props.className}>
      <h1 className={`text-[#F4F4F5] text-2xl mb-3`}>Infomacoes adicionais: (Opcional)</h1>
      <form className="text-[#F4F4F5] flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo1}</span>
            <input type="text" onChange={(e) => props.setObjt(e.target.value)}/>
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo2}</span>
            <input type="number" onChange={(e) => props.setAltura(e.target.value)}/>
          </label>
        </div>
        <div className="flex justify-beetween gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo3}</span>
            <input type="text" onChange={(e) => props.setExp(e.target.value)}/>
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo4}</span>
            <input type="number" onChange={(e) => props.setPeso(e.target.value)}/>
          </label>
        </div>
        <div className="flex justify-beetween gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo5}</span>
            <input type="text" onChange={(e) => props.setCondicoes(e.target.value)}/>
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo6}</span>
            <input type="text" onChange={(e) => props.setIndicacao(e.target.value)}/>
          </label>
        </div>
      </form>
    </div>
  );
};

export default FormsAdc;
