"use client";

import React, { useState } from "react";
import ListInfo from "../components/ListInfo";
import Search from "../components/search";

import styles from "../styles/alunos.module.css";
import MenuList from "../components/MenuList";
import Forms from "../components/Forms";
import FormsAdc from "../components/FormsAdc";

import { IoIosClose } from "react-icons/io";

const page = () => {
  const [stage, setStage] = useState("alunos");

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [sexo, setSexo] = useState("");
  const [tel, setTel] = useState("");
  const [plano, setPlano] = useState("");

  // Informacoes Opcionais
  const [objt, setObjt] = useState("");
  const [altura, setAltura] = useState("");
  const [exp, setExp] = useState("");
  const [peso, setPeso] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [indicacao, setIndicacao] = useState("");


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
            campo3="Genero:"
            campo4="Telefone:"
            campo5="Plano:"
            button="Cadastrar Aluno"
            className="formsGeral"
            setNome={setNome}
            setData={setData}
            setSexo={setSexo}
            setTel={setTel}
            setPlano={setPlano}
          >
            <FormsAdc
              campo1="Objetivo do aluno:"
              campo2="Altura:"
              campo3="Experiencia:"
              campo4="Peso"
              campo5="Condicoes especiais:"
              campo6="Indicacao:"
              className="formsADC"
              objt={objt}
              setObjt={setObjt}
              altura={altura}
              setAltura={setAltura}
              exp={exp}
              setExp={setExp}
              peso={peso}
              setPeso={setPeso}
              condicoes={condicoes}
              setCondicoes={setCondicoes}
              indicacao={indicacao}
              setIndicacao={setIndicacao}
            />
          </Forms>
        </div>
      )}
    </>
  );
};

export default page;
