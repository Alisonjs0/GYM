import { useEffect, useState } from "react";
import FormsAdc from "./FormsAdc";
import { usePathname } from "next/navigation";

import { getData } from "@/data/data";

export interface FormProps {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  button: string;
  className?: string;
  onSubmit: (data: {
    nome: string;
    data: string;
    sexo: string;
    tel: string;
    plano: string;
    objt?: string;
    altura?: string;
    exp?: string;
    peso?: string;
    condicoes?: string;
    indicacao?: string;
  }) => void;
}

const Forms = (props: FormProps) => {
  const { newAluno } = getData();

  const pathname = usePathname();

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [tel, setTel] = useState("");
  const [plano, setPlano] = useState("");

  const [salvo, setSalvo] = useState(true)

  const [formDataAdc, setFormDataAdc] = useState<{ 
    objt: string; 
    altura: string; 
    exp: string; 
    peso: string; 
    condicoes: string; 
    indicacao: string;
  }>({
    objt: "",
    altura: "",
    exp: "",
    peso: "",
    condicoes: "",
    indicacao: "",
  });

  const handleFormSubmitAdc = (dataAdc: { 
    objt: string; 
    altura: string; 
    exp: string; 
    peso: string; 
    condicoes: string; 
    indicacao: string; 
  }) => {
    setFormDataAdc((prevData) => ({
      ...prevData,
      ...dataAdc,
    }));
  };

  const handleSubmit = () => {
    if (salvo == false) {
      window.alert("Por favor, salve as informações adicionais.");
      return
    }

    newAluno()
    props.onSubmit({ 
      nome, 
      data, 
      sexo, 
      tel, 
      plano, 
      ...formDataAdc 
    });
  };

  return (
    <div className="mt-3">
      <form className="text-[#F4F4F5] flex flex-col gap-y-2">
        <label className="flex flex-col">
          <span>{props.campo1}</span>
          <input type="text" onChange={(e) => setNome(e.target.value)} />
        </label>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo2}</span>
            <input type="date" onChange={(e) => setData(e.target.value)} />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo3}</span>
            <select onChange={(e) => setSexo(e.target.value)}>
              <option value="">Selecione</option>
              <option value="masc">Masculino</option>
              <option value="fem">Feminino</option>
            </select>
          </label>
        </div>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo4}</span>
            <input type="tel" onChange={(e) => setTel(e.target.value)} />
          </label>
          <label className="flex flex-col w-1/2">
            <span>{props.campo5}</span>
            <select onChange={(e) => setPlano(e.target.value)}>
              <option value="">Selecione</option>
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
          </label>
        </div>
      </form>
      
      {pathname === "/alunos" && (
        <FormsAdc
          campo1="Objetivo do aluno:"
          campo2="Altura:"
          campo3="Experiência:"
          campo4="Peso"
          campo5="Condições especiais:"
          campo6="Indicação:"
          className="formsADC"
          onSubmit={handleFormSubmitAdc}
          setSalvo={setSalvo}
        />
      )}
      
      <div className="flex justify-end">
        <button
          className={`bg-[#332280] text-[#F4F4F5] px-4 py-2 rounded-lg drop-shadow-xl mt-8 transition-transform hover:scale-105`}
          onClick={handleSubmit}
        >
          {props.button}
        </button>
      </div>
    </div>
  );
};

export default Forms;
