'use client'

import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";

import { useRouter } from "next/navigation";

export interface ListInfoProps {
  id: string;
  nome: string;
  contato: string;
  plano: string;
  status: string;
  className?: string;
}

export default function ListInfo({
  id,
  nome,
  contato,
  plano,
  status,
  className,
}: ListInfoProps) {
    const [valor, setValor] = useState(false);
    const [statusColor, setStatusColor] = useState("");
    const router = useRouter();

    useEffect(() => {
        handleStatus(status);
      }, [status]);

  const handleStatus = (status: string) => {
    switch (status) {
      case "Ativo":
        setValor(true)
        setStatusColor("text-[#0FB800]");
        break
      case "Inativo":
        setValor(true)
        setStatusColor("text-[#C10003]");
        break
      case "Pendente":
        setValor(true)
        setStatusColor("text-[#C4CB00]");
        break
      case "Cancelado":
        setValor(true)
        setStatusColor("text-[#585858]");
        break
    }
  };

  const handleClick = () => {
    router.push(`/alunos/${id}`);
  }
  return (
    <div
      className={`${className} bg-[#232241] flex justify-between px-8 py-4 rounded-xl mb-4 drop-shadow-xl transition-transform hover:scale-105 cursor-pointer`}
      onClick={handleClick}
    >
      <p className="text-[#F4F4F5] w-1/2">{nome}</p>
      <p className="text-[#F4F4F5] w-1/4">{contato}</p>
      <p className="text-[#F4F4F5] w-1/3">{plano}</p>
      {!valor ? (
        <p className={`${statusColor} text-[#F4F4F5] w-1/6`}>{status}</p>
      ) : (
        <span className={`${statusColor} w-1/6 pl-5`}>
          <FaCircle />
        </span>
      )}
    </div>
  );
}
