"use client";

import React, { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";

import ListInfo from "../components/ListInfo";
import Search from "../components/search";
import Form from "../components/Forms";

import styles from "../styles/alunos.module.css";
import MenuList from "../components/MenuList";

const page = () => {
  const [stage, setStage] = useState("agenda");

  const {isLogged, redirect, hasRedirected} = useLogin();

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
    <>
      {stage === "agenda" && (
        <div className={styles.container}>
          <h1 className="text-[#F4F4F5] text-3xl mt-12">Agendamentos:</h1>
          <div>
            <Search className={styles.search} />
            <div>
              <MenuList
                nome="Aluno"
                contato="Data"
                plano="Tipo"
                status="Horario"
              ></MenuList>
              <ListInfo
                className={styles.list}
                nome="Alison Jose Serafim de Lima"
                contato="26/12/2024"
                plano="Avaliacao Fisica"
                status="13:30"
              />
              <ListInfo
                className={styles.list}
                nome="Alison Jose Serafim de Lima"
                contato="04/01/2025"
                plano="Consulta Nutricionista"
                status="08:20"
              />
            </div>
            <button
              onClick={() => setStage("cadastro")}
              className={`bg-[#332280] text-[#F4F4F5] px-4 py-2 rounded-lg fixed bottom-12 right-12 z-20 drop-shadow-xl`}
            >
              Novo Agendamento
            </button>
          </div>
        </div>
      )}
      {stage === "cadastro" && (
        <div className={styles.container}>
          <h1 className="text-[#F4F4F5] text-2xl mt-12">Novo Agendamento:</h1>
          <Form
            campo1="Nome"
            campo2="Data do agendamento:"
            campo3="Horario:"
            campo4="Servico agendado:"
            campo5="Responsavel"
            button="Novo Agendamento"
            onSubmit={function (data: {
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
            }): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      )}
    </>
  );
};

export default page;
