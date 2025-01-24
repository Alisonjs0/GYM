"use client";

import React, { useState, useContext, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";

import ListInfo from "../components/ListInfo";
import Search from "../components/search";

import styles from "../styles/alunos.module.css";
import MenuList from "../components/MenuList";
import Forms from "../components/Forms";

import { DataContext } from "@/context/dataContext";

import { useInsertDocument } from "@/hooks/useInsertDocument";

import { IoIosClose } from "react-icons/io";

const page = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Contexto DataContext não foi fornecido.");
  }

  const { insertDocument, response } = useInsertDocument();

  const { total, newAluno } = context;
  const addAluno = () => {
    console.log(formData);
    if (
      !formData.nome ||
      !formData.data ||
      !formData.sexo ||
      !formData.tel ||
      !formData.plano
    ) {
      console.log("Preencha todos os campos obrigatórios.");
      return;
    }
    newAluno();
    insertDocument(formData);
  };

  const [stage, setStage] = useState("alunos");
  const [formData, setFormData] = useState<{
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
  }>({
    nome: "",
    data: "",
    sexo: "",
    tel: "",
    plano: "",
    objt: "",
    altura: "",
    exp: "",
    peso: "",
    condicoes: "",
    indicacao: "",
  });

  const handleFormSubmit = (data: {
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
  }) => {
    addAluno();
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    insertDocument({
      ...formData, ...data
    });
  };

  // Informacoes Opcionais

  const [altura, setAltura] = useState("");
  const [exp, setExp] = useState("");
  const [peso, setPeso] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [indicacao, setIndicacao] = useState("");

  const { isLogged, redirect, hasRedirected } = useLogin();

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
      {stage === "alunos" && (
        <div className={`${styles.container} relative`}>
          <button className="bg-[#332280] text-[#F4F4F5]" onClick={addAluno}>
            askudjb
          </button>
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
              className={`bg-[#332280] text-[#F4F4F5] px-4 py-2 rounded-lg fixed bottom-12 right-12 z-20 drop-shadow-xl transition-transform hover:scale-105`}
              onClick={() => setStage("cadastrar")}
            >
              Cadastrar Aluno
            </button>
          </div>
        </div>
      )}
      {stage === "cadastrar" && (
        <div className={`${styles.container} relative`}>
          <h1 className="text-[#F4F4F5] text-2xl mt-12">Cadastrar Aluno:</h1>
          <p
            onClick={() => setStage("alunos")}
            className="text-[#f4f4f5] text-3xl cursor-pointer absolute top-0 right-0"
          >
            <IoIosClose />
          </p>
          <Forms
            campo1="Nome:"
            campo2="Data de Nascimento:"
            campo3="Sexo:"
            campo4="Telefone:"
            campo5="Plano:"
            button="Cadastrar Aluno"
            onSubmit={(data) => handleFormSubmit(data)}
          ></Forms>
        </div>
      )}
      {response.error && console.log(response.error)}
    </>
  );
};

export default page;
