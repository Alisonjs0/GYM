"use client";

import React, { useState } from "react";
import styles from "@/app/styles/financeiro.module.css";

import { useUpdate } from "@/hooks/useUpdate";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { usePayment } from "@/hooks/usePayment";

import ListInfo from "@/app/components/ListInfo";

const Financeiro = () => {
  const { handleChangeInfo } = usePayment();
  const { documents: alunos } = useFetchDocuments("alunos");
  const { setIdAluno, atualizar } = useUpdate();
  const [statusAtualizando, setStatusAtualizando] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <div key={aluno.id} className="flex gap-x-4 text-[#F4F4F5] mb-4">
              <div className="flex-1">
                <ListInfo
                  id={aluno.id}
                  nome={aluno.nome}
                  contato={aluno.tel}
                  plano={aluno.plano}
                  status={aluno.status}
                  className="flex-1 mb-0"
                />
              </div>
              {aluno.status === "Pendente" && (
                <>
                  <button
                    onClick={() =>
                      handleChangeInfo(
                        aluno.valorPlano,
                        aluno.nome,
                        aluno.plano
                      )
                    }
                    className="bg-[#332280] text-[#f4f4f4] px-6 py-4 rounded-lg h-full"
                  >
                    {statusAtualizando === aluno.id
                      ? "Atualizando..."
                      : "Ativar"}
                  </button>
                </>
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
