import React from "react";
import MenuSection from "../components/MenuSection";

//css
import styles from "../styles/dashboard.module.css";

// icons
import {
  MdPersonSearch,
  MdPersonAddAlt1,
  MdPersonAddDisabled,
} from "react-icons/md";

const page = () => {
  return (
    <div className={`${styles.container}`}>
        <h1 className={`text-[#F4F4F5] text-3xl my-12`}>Dashboard:</h1>
        <div className={styles.layout}>
          <MenuSection
            icon={<MdPersonSearch />}
            title="Lista de Matriculados"
          />
          <MenuSection
            icon={<MdPersonAddDisabled />}
            title="Matriculas expiradas"
          />
          <MenuSection
            icon={<MdPersonAddAlt1 />}
            title="Cadastrar novo aluno"
          />
        </div>
    </div>
  );
};

export default page;
