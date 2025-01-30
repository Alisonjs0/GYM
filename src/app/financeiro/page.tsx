"use client";

import React, { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import styles from "../styles/financeiro.module.css";
import { useUpdate } from "@/hooks/useUpdate";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

import MenuList from "../components/MenuList";
import ListInfo from "../components/ListInfo";

const Financeiro = () => {
  const { documents: alunos } = useFetchDocuments("alunos");
  const { setIdAluno, atualizar } = useUpdate();
  const [statusAtualizando, setStatusAtualizando] = useState<string | null>(
    null
  );

  const { isLogged, redirect, hasRedirected } = useLogin();

  useEffect(() => {
    if (isLogged === false && !hasRedirected) {
      redirect();
    }
  }, [isLogged, hasRedirected, redirect]);

  if (!isLogged) {
    return (
      <div className="w-full h-full text-[#F4F4F5] m-auto flex flex-col justify-center items-center">
        <p>Você precisa estar logado para acessar essa página.</p>
        <p>Redirecionando para a página de login...</p>
      </div>
    );
  }

  const handleUpdate = async (alunoId: string, statusAtual: string) => {
    const novoStatus = statusAtual !== "Ativo" ? "Ativo" : "Pendente";
    setStatusAtualizando(alunoId);
    setIdAluno(alunoId);
    await atualizar({ status: novoStatus });

    setStatusAtualizando(null);
  };

  return (
    <div className={`${styles.container}`}>
      <h1 className="text-[#F4F4F5] text-3xl my-12 ">Financeiro:</h1>
      {alunos && alunos.length > 0 ? (
        alunos
          .filter((aluno) => aluno.status === "Pendente") // Filtro para alunos pendentes
          .map((aluno) => (
            <div
              key={aluno.id}
              className="flex gap-x-4 text-[#F4F4F5] mb-4"
            >
              <div className="flex-1">
                <ListInfo
                  id={aluno.id}
                  nome={aluno.nome}
                  contato={aluno.tel}
                  plano={aluno.plano}
                  status={aluno.status}
                  className="flex-1 h-full mb-0"
                />
              </div>
              {aluno.status === "Pendente" && (
                <button
                  onClick={() => handleUpdate(aluno.id, aluno.status)}
                  className="bg-[#332280] text-[#f4f4f4] px-6 rounded-lg"
                  disabled={statusAtualizando === aluno.id}
                >
                  {statusAtualizando === aluno.id ? "Atualizando..." : "Ativar"}
                </button>
              )}
            </div>
          ))
      ) : (
        <p className="text-[#F4F4F5] text-center mt-4">
          Nenhum aluno encontrado.
        </p>
      )}
    </div>
  );
};

export default Financeiro;
