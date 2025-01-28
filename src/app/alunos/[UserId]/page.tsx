"use client";

import { useParams } from "next/navigation";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

const AlunoPage = () => {
  const { UserId: id } = useParams(); // Captura o id da URL
  const { documents: alunos, loading } = useFetchDocuments("alunos");

  // Filtra o aluno com base no id
  const aluno = alunos?.find((aluno) => aluno.id.toString() === id);

  if (loading) {
    return <p className="ml-[30vw]">Carregando...</p>;
  }

  if (!aluno) {
    return <p className="ml-[30vw]">Aluno não encontrado!</p>;
  }

  return (
    <div className="ml-[25vw] mr-[5vw] h-screen overflow-hidden flex items-center text-[#F4F4F5]">
      <div className="h-[80%] w-[100%] bg-[#232241] rounded flex">
        <div className="w-1/4 border-r border-[#F4F4F5] flex flex-col items-center pt-12 gap-y-2">
          <div className="bg-[#F4F4F5] w-24 h-24 rounded-full"></div>
          <p className="text-md">
            {aluno.nome.split(" ").slice(0, 3).join(" ")}
          </p>
          <p className="text-sm">{aluno.tel}</p>
        </div>
        <div className="border-r border-[#F4F4F5] w-1/2">
          <h1 className="flex justify-center text-xl">Informacoes do Aluno:</h1>
          <label>
            <p>Nome: </p>
            <p className="border border-[#F4F4F5] p-1 w-3/4">{aluno.nome}</p>
          </label>
          <label>
          </label>
        </div>
        <div className="w-1/3">
          <h1 className="flex justify-center text-xl">Financeiro</h1>
          <p>Plano: {aluno.plano}</p>
          <p>Status: {aluno.status}</p>
        </div>
      </div>
    </div>
  );
};

export default AlunoPage;
