import React from "react";

export interface FormProps {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  children?: React.ReactNode;
  button: string;
  className?: string;
}

const Forms = (props: FormProps) => {
  return (
    <div className="mt-3">
      <form className="text-[#F4F4F5] flex flex-col gap-y-2">
        <label className="flex flex-col">
          <span>{props.campo1}</span>
          <input type="text" />
        </label>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo2}</span>
            <input type="date" />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo3}</span>
            <select>
              <option value="masc">Masculino</option>
              <option value="fem">Feminino</option>
            </select>
          </label>
        </div>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo4}</span>
            <input type="tel" />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo5}</span>
            <select>
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
          </label>
        </div>
      </form>
      {props.children && <div className="mt-3">{props.children}</div>}
      <div className="flex justify-end">
        <button
          className={`bg-[#332280] text-[#F4F4F5] px-4 py-2 rounded-lg drop-shadow-xl my-6`}
        >
          {props.button}
        </button>
      </div>
    </div>
  );
};

export default Forms;
