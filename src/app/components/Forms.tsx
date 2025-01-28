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
    sexo?: string;
    tel?: string;
    plano?: string;
    objt?: string;
    altura?: string;
    exp?: string;
    peso?: string;
    condicoes?: string;
    indicacao?: string;

    horario?: string;
    servico?: string;
    responsavel?: string;
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

  const [horario, setHorario] = useState("");
  const [servico, setServico] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const [salvo, setSalvo] = useState(true);

  const [formDataAdc, setFormDataAdc] = useState<{}>({
    objt: "",
    altura: "",
    exp: "",
    peso: "",
    condicoes: "",
    indicacao: "",
  });

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(formatDate(e.target.value));
  };

  const formatarTelefone = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, ""); // Remove tudo que não é número

    if (apenasNumeros.length <= 10) {
      // Formato: (XX) XXXX-XXXX
      return apenasNumeros.replace(
        /(\d{0,2})(\d{0,4})(\d{0,4})/,
        (_, ddd, parte1, parte2) =>
          [ddd && `(${ddd})`, parte1, parte2].filter(Boolean).join(" ")
      );
    } else {
      // Formato: (XX) XXXXX-XXXX
      return apenasNumeros.replace(
        /(\d{0,2})(\d{0,5})(\d{0,4})/,
        (_, ddd, parte1, parte2) =>
          [ddd && `(${ddd})`, parte1, parte2].filter(Boolean).join(" ")
      );
    }
  };

  const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorFormatado = formatarTelefone(valor); // Formata o telefone em tempo real
    setTel(valorFormatado); // Atualiza o estado com o valor formatado
  };

  const handleFormSubmitAdc = (dataAdc: typeof formDataAdc) => {
    setData(data);
    setFormDataAdc((prevData) => ({
      ...prevData,
      ...dataAdc,
    }));
  };

  const handleSubmit = () => {
    if (salvo == false) {
      window.alert("Por favor, salve as informações adicionais.");
      return;
    }

    props.onSubmit({
      nome,
      data,
      sexo,
      tel,
      plano,
      ...formDataAdc,
    });
  };

  const handleAgendamentoSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onSubmit({
      nome,
      data,
      horario,
      servico,
      responsavel,
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
            <input type="date" onChange={handleChangeData} />
          </label>
          {pathname === "/alunos" ? (
            <label className="flex flex-col w-1/2">
              <span>{props.campo3}</span>
              <select onChange={(e) => setSexo(e.target.value)}>
                <option value="">Selecione</option>
                <option value="masc">Masculino</option>
                <option value="fem">Feminino</option>
              </select>
            </label>
          ) : (
            <label className="flex flex-col w-1/2">
              <span>{props.campo3}</span>
              <input type="text" onChange={(e) => setHorario(e.target.value)} />
            </label>
          )}
        </div>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col w-3/4">
            <span>{props.campo4}</span>
            {pathname === "/alunos" ? (
              <input type="text" value={tel} maxLength={15} onChange={handleChangeTel} />
            ) : (
              <input
                type="text"
                value={responsavel}
                onChange={(e) => setServico(e.target.value)}
              />
            )}
          </label>
          {pathname === "/alunos" ? (
            <label className="flex flex-col w-1/2">
              <span>{props.campo5}</span>
              <select onChange={(e) => setPlano(e.target.value)}>
                <option value="">Selecione</option>
                <option value="Mensal">Mensal</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
              </select>
            </label>
          ) : (
            <label className="flex flex-col w-1/2">
              <span>{props.campo5}</span>
              <input
                type="text"
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </label>
          )}
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
          onClick={
            pathname === "/alunos" ? handleSubmit : handleAgendamentoSubmit
          }
        >
          {props.button}
        </button>
      </div>
    </div>
  );
};

export default Forms;
