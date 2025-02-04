import React, { useState } from "react";

export interface FormAdcProps {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
  className?: string;
  setSalvo: React.Dispatch<React.SetStateAction<boolean>>;

  onSubmit: (dataAdc: {
    objt: string;
    altura: string;
    exp: string;
    peso: string;
    condicoes: string;
    indicacao: string;
  }) => void;
}

const FormsAdc = (props: FormAdcProps) => {
  // Informacoes opcionais
  const [objt, setObjt] = useState("");
  const [altura, setAltura] = useState("");
  const [exp, setExp] = useState("");
  const [peso, setPeso] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [indicacao, setIndicacao] = useState("");

  const handleSubmit = () => {
    props.onSubmit({ objt, altura, exp, peso, condicoes, indicacao });
  };

  return (
    <div className={props.className}>
      <h1 className={`text-[#F4F4F5] text-2xl mb-3`}>
        Informações adicionais: (Opcional)
      </h1>
      <form
        className="text-[#F4F4F5] flex flex-col gap-y-4"
      >
        <div className="flex justify-between gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo1}</span>
            <input type="text" onChange={(e) => {setObjt(e.target.value); props.setSalvo(false) }} />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo2}</span>
            <input type="number" onChange={(e) => {setAltura(e.target.value); props.setSalvo(false) }} />
          </label>
        </div>
        <div className="flex justify-between gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo3}</span>
            <input type="text" onChange={(e) => {setExp(e.target.value); props.setSalvo(false) }} />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo4}</span>
            <input type="number" onChange={(e) => {setPeso(e.target.value); props.setSalvo(false)}} />
          </label>
        </div>
        <div className="flex justify-between gap-x-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo5}</span>
            <input type="text" onChange={(e) => {setCondicoes(e.target.value); props.setSalvo(false)}} />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo6}</span>
            <input type="text" onChange={(e) => {setIndicacao(e.target.value); props.setSalvo(false)}} />
          </label>
        </div>
      </form>
      <div className="flex justify-end relative w-full text-[#F4F4F5] pt-2 relative">
        <button className="absolute"onClick={() => {handleSubmit(); props.setSalvo(true)}}>Salvar</button>
      </div>
    </div>
  );
};

export default FormsAdc;
