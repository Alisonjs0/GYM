// CaptacaoDeAlunos.tsx
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { useEffect, useState } from "react";

// Definição do tipo DataItem
export interface DataItem {
  month: string;
  "Alunos Matriculados": number;
  Desistencias: number;
  valor: number;
}

export default function CaptacaoDeAlunos() {
  const { documents: alunos, loading, error } = useFetchDocuments("alunos"); // Chamando o hook aqui
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (alunos) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const countByMonth: Record<
        string,
        { matriculados: number; desistencias: number }
      > = {};

      alunos.forEach((aluno) => {
        const monthIndex = new Date(aluno.createdAt.toDate()).getMonth();
        const monthName = months[monthIndex];

        if (!countByMonth[monthName]) {
          countByMonth[monthName] = { matriculados: 0, desistencias: 0 };
        }

        countByMonth[monthName].matriculados += 1;

        if (aluno.desistente) {
          countByMonth[monthName].desistencias += 1;
        }
      });

      setData(
        months.map((month) => ({
          month,
          "Alunos Matriculados": countByMonth[month]?.matriculados || 0,
          Desistencias: countByMonth[month]?.desistencias || 0,
          valor: countByMonth[month]?.matriculados || 0,
        }))
      );
    }
  }, [alunos]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
