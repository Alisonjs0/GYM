"use client";

import React, { useEffect } from "react";

import { useLogin } from "@/hooks/useLogin";

import { CaptacaoDeAlunos } from "@/components/CaptacaoDeAlunos";
import { ProgressoFinanceiro } from "@/components/ProgressoFinanceiro";
import { TotalDeAlunos } from "@/components/TotaldeAlunos";

//css
import styles from "@/app/styles/dashboard.module.css";

const Dashboard = () => {

  return (
    <div className={`${styles.container}`}>
      <h1 className={`text-[#F4F4F5] text-3xl my-12`}>Dashboard:</h1>
      <div className="flex flex-wrap gap-4 justify-between">
        <span className="w-[32%] flex flex-col gap-y-8">
          <span>
            <TotalDeAlunos
              total={50}
              title="Total de Alunos Ativos"
              subtitle="Alunos Ativos"
            />
          </span>
          <span>
            <TotalDeAlunos
              total={23}
              title="Pagamentos Pendentes"
              subtitle="Pagamentos Pendentes"
            />
          </span>
        </span>
        <span className="w-[65%] flex flex-col gap-y-8 pb-12">
          <span>
            <CaptacaoDeAlunos />
          </span>
          <span>
            <ProgressoFinanceiro />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
