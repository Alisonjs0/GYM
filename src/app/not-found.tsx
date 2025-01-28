"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";

export default function NotFound() {
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
    <div className="h-full text-[#F4F4F5] ml-[20vw] flex flex-col justify-center items-center">
      <h1 className="text-[#F4F4F5] text-4xl mt-12">404</h1>
      <p>Página não encontrada</p>
      <Link
        href={"/dashboard"}
        className="bg-[#332280] px-6 py-4 rounded-lg mt-4"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
