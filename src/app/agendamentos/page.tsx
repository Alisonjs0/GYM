import React from "react";
import ListInfo from "../components/ListInfo";
import Search from "../components/search";

import styles from "../styles/alunos.module.css";
import MenuList from "../components/MenuList";

const page = () => {
  return (
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
          className={`bg-[#332280] text-[#F4F4F5] px-4 py-2 rounded-lg fixed bottom-12 right-12 z-20 drop-shadow-xl`}
        >
          Novo Agendamento
        </button>
      </div>
    </div>
  );
};

export default page;
