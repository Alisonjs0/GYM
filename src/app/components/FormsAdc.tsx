import React from "react";

export interface FormAdcProps {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
}

const FormsAdc = (props: FormAdcProps) => {
  return (
    <>
      <h1>Infomacoes adicionais: (Opcional)</h1>
      <form>
        <label>
          <span>{props.campo1}</span>
          <input type="text" />
        </label>
        <label>
          <span>{props.campo2}</span>
          <input type="number" />
        </label>
        <label>
          <span>{props.campo3}</span>
          <input type="text" />
        </label>
        <label>
          <span>{props.campo4}</span>
          <input type="number" />
        </label>
        <label>
          <span>{props.campo5}</span>
          <input type="text" />
        </label>
        <label>
          <span>{props.campo6}</span>
          <input type="text" />
        </label>
      </form>
      c
    </>
  );
};

export default FormsAdc;
