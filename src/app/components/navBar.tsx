'use client'

import React from "react";
import { usePathname } from "next/navigation";

import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { FaCalendar } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";

import styles from "../styles/navBar.module.css";
import Link from "next/link";

const NavBar = () => {

  const pathname = usePathname();
  console.log(pathname);

  const menuItens = [
    {id: "dashboard", label: "Dashboard", path: "/dashboard", icon: <MdDashboard className={styles.icon}/>},
    {id: "alunos", label: "Alunos", path: "/alunos", icon: <HiUserGroup className={styles.icon}/>},
    {id: "agendamentos", label:"Agendamentos", path: "/agendamentos", icon: <FaCalendar className={styles.icon}/>},
    {id: "financeiro", label: "Financeiro", path: "/financeiro", icon: <IoMdWallet className={styles.icon}/>}
  ]
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          {menuItens.map((item) => (
            <li key={item.id} className={`${pathname == item.path ? styles.active : ""} drop-shadow-lg`}>
              <Link href={item.path} className={`${styles.link}`}>
                {item.icon}
                <p>{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
