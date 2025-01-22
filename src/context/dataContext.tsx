'use client'

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface DataItem {
  month: string;
  "Alunos Matriculados": number;
  Desistencias: number;
  valor: number;
}

interface DataContextType {
  data: DataItem[];
  total: number;
  newAluno: () => void;
  desistencia: () => void;
}

interface DataContextProviderProps {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const data: DataItem[] = [
    {
      month: "January",
      "Alunos Matriculados": 186,
      Desistencias: 80,
      valor: 186,
    },
    {
      month: "February",
      "Alunos Matriculados": 305,
      Desistencias: 200,
      valor: 305,
    },
    {
      month: "March",
      "Alunos Matriculados": 237,
      Desistencias: 120,
      valor: 237,
    },
    { month: "April", "Alunos Matriculados": 73, Desistencias: 190, valor: 73 },
    { month: "May", "Alunos Matriculados": 209, Desistencias: 130, valor: 209 },
    {
      month: "June",
      "Alunos Matriculados": 214,
      Desistencias: 140,
      valor: 214,
    },
  ];

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const totAtivos = data.reduce((total, item) => {
      const ativos = item["Alunos Matriculados"] - item["Desistencias"];
      return total + (ativos > 0 ? ativos : 0);
    }, 0);

    setTotal(totAtivos);
  }, []);

  const newAluno = () => {
    setTotal(total + 1);
  };

  const desistencia = () => {
    setTotal(total - 1);
  };

  return (
    <DataContext.Provider value={{ data, total, newAluno, desistencia }}>
      {children}
    </DataContext.Provider>
  );
};
