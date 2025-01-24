'use client'

import React, { useEffect, useState } from 'react'
import { useLogin } from '@/hooks/useLogin';
import styles from "../styles/financeiro.module.css"

const page = () => {
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
    <div className={styles.container}>
        <h1 className='text-[#F4F4F5] text-3xl mt-12'>Financeiro:</h1>
    </div>
  )
}

export default page