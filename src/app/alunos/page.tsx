"use client";

import React, { useState } from "react";
import ListInfo from "../components/ListInfo";
import Search from "../components/search";

import styles from "../styles/alunos.module.css";
import MenuList from "../components/MenuList";
import Forms from "../components/Forms";
import FormsAdc from "../components/FormsAdc";

const page = () => {
  const [stage, setStage] = useState("alunos");

  return (
    <>
      {stage === "alunos" && (
        <div className={`${styles.container} relative`}>
          <h1 className="text-[#F4F4F5] text-3xl mt-12">Alunos:</h1>
          <div className="relative">
            <Search className={styles.search} />
            <div>
              <MenuList
                nome="Nome"
                contato="Contato"
                plano="Plano"
                status="Status"
              />
              <ListInfo
                className={styles.list}
                nome="Alison Jose Serafim de Lima"
                contato="(81) 991226762"
                plano="Mensal"
                status="Pendente"
              />
              <ListInfo
                className={styles.list}
                nome="Alison Jose Serafim de Lima"
                contato="(81) 991226762"
                plano="Trimestral"
                status="Ativo"
              />
            </div>
            <button
              className={`bg-[#332280] text-[#F4F4F5] px-4 py-2 rounded-lg fixed bottom-12 right-12 z-20 drop-shadow-xl`}
              onClick={() => setStage("cadastrar")}
            >
              Cadastrar Aluno
            </button>
          </div>
        </div>
      )}
      {stage === "cadastrar" && (
        <div className={`${styles.container} relative`}>
          <h1 className="text-[#F4F4F5] text-3xl mt-12">Cadastrar Aluno:</h1>
          <p onClick={() => setStage("alunos")} className="text-[#f4f4f5] text-3xl cursor-pointer">X</p>
          <Forms campo1="Nome:" campo2="Data de Nascimento:" campo3="Genero:" campo4="Telefone:" campo5="Plano:" button="Cadastrar Aluno">
            <FormsAdc campo1="Objetivo do aluno:" campo2="Altura:" campo3="Experiencia:" campo4="Peso" campo5="Condicoes especiais:" campo6="Indicacao:"/>
          </Forms>
        </div>
      )}
    </>
  );
};

export default page;
