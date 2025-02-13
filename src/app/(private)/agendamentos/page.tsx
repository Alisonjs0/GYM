"use client";

import React, { useState } from "react";
import { useInsertDocument } from "@/hooks/useInsertDocument";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

import Swal from "sweetalert2";

import ListInfo from "@/app/components/ListInfo";
import Search from "@/app/components/search";
import Form from "@/app/components/Forms";

import styles from "@/app/styles/alunos.module.css";
import MenuList from "@/app/components/MenuList";

interface FormData {
  nome: string;
  data: string;
  horario?: string;
  servico?: string;
  responsavel?: string;
}

const Agendamentos = () => {
  const [stage, setStage] = useState("agenda");

  const [search, setSearch] = useState("");
  
  const { insertDocument } = useInsertDocument("agenda");

  const { documents: agendamentos, loading } = useFetchDocuments("agenda");

  const showAlert = () => {
    Swal.fire({
      title: "Alerta!",
      text: "Novo Agendamento Cadastrado!",
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

  return (
    <>
      {stage === "agenda" && (
        <div className={styles.container}>
          <h1 className="text-[#F4F4F5] text-3xl mt-12">Agendamentos:</h1>
          <div>
            <Search className={styles.search} setSearch={setSearch} />
            <div>
              <MenuList
                nome="Aluno"
                contato="Data"
                plano="Tipo"
                status="Horario"
              ></MenuList>
              {loading && <p>Carregando...</p>}
              {agendamentos
                ?.filter((agenda) => {
                  const normalizedSearch = search
                    .trim()
                    .replace(/\s+/g, "")
                    .toLowerCase();

                  if (normalizedSearch === "") return true;

                  return Object.values(agenda).some((valor) => {
                    if (typeof valor === "string") {
                      const normalizedValue = valor
                        .trim()
                        .replace(/\s+/g, "")
                        .toLowerCase();
                      return normalizedValue.includes(normalizedSearch);
                    }
                    return false;
                  });
                })
                .map((agenda) => (
                  <ListInfo
                    key={agenda.id}
                    id={agenda.id}
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

export default Agendamentos;
