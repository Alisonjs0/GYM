"use client";

import React from "react";

import { CaptacaoDeAlunos } from "@/components/CaptacaoDeAlunos";
import { ProgressoFinanceiro } from "@/components/ProgressoFinanceiro";
import { TotalDeAlunos } from "@/components/TotaldeAlunos";

//css
import styles from "@/app/styles/dashboard.module.css";

import { useFetchDocuments } from "@/hooks/useFetchDocuments";

import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const { documents: alunos, loading } = useFetchDocuments("alunos");

  const alunosAtivos =
    alunos && alunos.filter((aluno) => aluno.status === "Ativo");
  const alunosPendentes =
    alunos && alunos.filter((aluno) => aluno.status === "Pendente");

  const meses = [
    "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const contagemPorMes = new Array(12).fill(0);
  const desistenciasPorMes = new Array(12).fill(0);
  const arrecadadoPorMes = new Array(12).fill(0);

  alunos?.forEach((aluno) => {
    if (aluno.createdAt) {
      const dataCriacao = aluno.createdAt.toDate();
      const mes = dataCriacao.getMonth();
      contagemPorMes[mes]++;
      if (aluno.status === "Inativo" || aluno.status === "Cancelado") {
        desistenciasPorMes[mes]++;
      }
      if (aluno.valorPlano) {
        arrecadadoPorMes[mes] += aluno.valorPlano;
      }
    }
  });

  const resultdado = meses.map((nomeMes, index) => ({
    mes: nomeMes,
    matriculas: contagemPorMes[index],
    desistencias: desistenciasPorMes[index],
    arrecadado: arrecadadoPorMes[index] ? arrecadadoPorMes[index].toFixed(2) : ""
  }));


  return (
    <div className={`${styles.container}`}>
      <h1 className={`text-[#F4F4F5] text-3xl my-12`}>Dashboard:</h1>
      <div className="flex flex-wrap gap-4 justify-between">
        <span className="w-[32%] flex flex-col gap-y-8">
          <span>
            <TotalDeAlunos
              total={alunosAtivos?.length || 0}
              title="Total de Alunos Ativos"
              subtitle="Alunos Ativos"
            />
          </span>
          <span>
            <TotalDeAlunos
              total={alunosPendentes?.length || 0}
              title="Pagamentos Pendentes"
              subtitle="Pagamentos Pendentes"
              handleRedirect={() => router.push("/financeiro")}
            />
          </span>
        </span>
        <span className="w-[65%] flex flex-col gap-y-8 pb-12">
          <span>
            <CaptacaoDeAlunos result={resultdado} />
          </span>
          <span>
            <ProgressoFinanceiro result={resultdado}/>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
