'use client'

import React, { useEffect } from "react";

import { useLogin } from "@/hooks/useLogin";

import { CaptacaoDeAlunos } from "@/components/CaptacaoDeAlunos";
import { ProgressoFinanceiro } from "@/components/ProgressoFinanceiro";
import { TotalDeAlunos } from "@/components/TotaldeAlunos";

//css
import styles from "../styles/dashboard.module.css";

const page = () => {

    const {isLogged, redirect, hasRedirected} = useLogin();

    console.log(isLogged, hasRedirected);

    useEffect(() => {
      if (isLogged === false && !hasRedirected) {
        redirect();
      }
    }, [isLogged, hasRedirected, redirect]);

    if (!isLogged) {
      return (
        <div className="w-full  h-full text-[#F4F4F5] m-auto flex flex-col justify-center items-center">
          <p>Você precisa estar logado para acessar essa página.</p>
          <p>Redirecionando para a pagina de login...</p>
        </div>
      );
    }

  return (
    <div className={`${styles.container}`}>
      <h1 className={`text-[#F4F4F5] text-3xl my-12`}>Dashboard:</h1>
      <div className="grid grid-cols-5 grid-rows-8 gap-8">
        <span className="col-start-1 col-end-3 row-start-1 row-end-4 div1">
        <TotalDeAlunos />
        </span>
        <span className="col-start-3 col-end-6 row-start-1 row-end-6 div2">
        <CaptacaoDeAlunos />
        </span>
        <span className="col-start-1 col-end-3 row-start-4 row-end-9 div3">
        <ProgressoFinanceiro />
        </span>
      </div>
    </div>
  );
};

export default page;
