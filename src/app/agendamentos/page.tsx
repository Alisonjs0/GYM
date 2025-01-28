"use client";

import React, { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useInsertDocument } from "@/hooks/useInsertDocument";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

import Swal from "sweetalert2";

import ListInfo from "../components/ListInfo";
import Search from "../components/search";
import Form from "../components/Forms";

import styles from "../styles/alunos.module.css";
import MenuList from "../components/MenuList";

interface FormData {
  nome: string;
  data: string;
  horario?: string;
  servico?: string;
  responsavel?: string;
}

const page = () => {
  const [stage, setStage] = useState("agenda");

  const { insertDocument, response } = useInsertDocument("agenda");

  const { documents: agendamentos, loading } = useFetchDocuments("agenda");

  const showAlert = () => {
    Swal.fire({
      title: "Alerta!",
      text: "Aluno cadastrado com sucesso.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        setStage("agenda");
      }
    });
  };

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    data: "",
    horario: "",
    servico: "",
    responsavel: "",
  });

  const handleFormSubmit = (data: FormData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    insertDocument({
      ...formData,
      ...data,
    });
    showAlert();
  };

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
              {loading && <p>Carregando...</p>}
              {agendamentos &&
                agendamentos.map((agenda) => (
                  <ListInfo
                    className={styles.list}
                    key={agenda.id}
                    nome={agenda.nome}
                    contato={agenda.data}
                    plano={agenda.servico}
                    status={agenda.horario}
                  />
                ))}
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
            onSubmit={(data: FormData) => handleFormSubmit(data)}
          />
        </div>
      )}
    </>
  );
};

export default page;
