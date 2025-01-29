"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useLogin } from "@/hooks/useLogin";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

import InfoAluno from "@/app/components/InfoAluno";

import { ScrollArea } from "@/components/ui/scroll-area";

const AlunoPage = () => {
  const { UserId: id } = useParams(); // Captura o id da URL
  const { documents: alunos, loading } = useFetchDocuments("alunos");

  const { isLogged, redirect, hasRedirected } = useLogin();

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

  // Filtra o aluno com base no id
  const aluno = alunos?.find((aluno) => aluno.id.toString() === id);

  if (loading) {
    return <p className="ml-[30vw]">Carregando...</p>;
  }

  if (!aluno) {
    return <p className="ml-[30vw]">Aluno não encontrado!</p>;
  }

  const data = new Date(
    aluno.createdAt?.toDate ? aluno.createdAt.toDate() : aluno.createdAt
  );

  const dataDePagamento = new Date(data);

  switch (aluno.plano) {
    case "Mensal":
      dataDePagamento.setMonth(data.getMonth() + 1);
      break;
    case "Trimestral":
      dataDePagamento.setMonth(data.getMonth() + 3);
      break;
    case "Semestral":
      dataDePagamento.setMonth(data.getMonth() + 6);
      break;
    case "Anual":
      dataDePagamento.setFullYear(data.getFullYear() + 1);
      break;
  }

  console.log(dataDePagamento);

  const dataPagamentoFormatada = dataDePagamento.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Verifica se a data é válida
  if (isNaN(data.getTime())) {
    return <p className="ml-[30vw]">Data inválida!</p>;
  }

  const dataFormatada = data.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sexoFormatado = aluno.sexo === "masc" ? "Masculino" : "Feminino";

  const alturaFormatada = aluno.altura > 3 ? aluno.altura / 100 : aluno.altura;

  const CalcularIMC = Number(
    (aluno.peso / (alturaFormatada * alturaFormatada)).toFixed(2)
  );

  if (!CalcularIMC) {
    aluno.condicoes = "N/A";
  } else if (CalcularIMC < 18.5) {
    aluno.condicoes = "Abaixo do peso";
  } else if (CalcularIMC >= 18.5 && CalcularIMC <= 24.9) {
    aluno.condicoes = "Peso normal";
  } else if (CalcularIMC >= 25 && CalcularIMC <= 29.9) {
    aluno.condicoes = "Sobrepeso";
  } else if (CalcularIMC >= 30 && CalcularIMC <= 34.9) {
    aluno.condicoes = "Obesidade I";
  } else if (CalcularIMC >= 35 && CalcularIMC <= 39.9) {
    aluno.condicoes = "Obesidade II";
  } else {
    aluno.condicoes = "Obesidade III";
  }

  // Teste Historico
  const historicoPagamentos = [
    {
      id: 1,
      data: "16/01/2025",
      valor: 150.0,
      metodoPagamento: "Cartão de Crédito",
      status: "Pago",
    },
    {
      id: 2,
      data: "20/01/2025",
      valor: 200.0,
      metodoPagamento: "Transferência Bancária",
      status: "Pago",
    },
    {
      id: 3,
      data: "2025/01/25",
      valor: 120.0,
      metodoPagamento: "Boleto",
      status: "Pendente",
    },
    {
      id: 4,
      data: "28/01/2025",
      valor: 250.0,
      metodoPagamento: "Dinheiro",
      status: "Pago",
    },
  ];

  return (
    <div className="ml-[25vw] mr-[5vw] h-screen overflow-hidden flex items-center text-[#F4F4F5]">
      <div className="h-[80%] w-[100%] bg-[#232241] rounded-lg flex">
        <div className="w-1/4 border-r border-[#f4f4f521] flex flex-col items-center pt-12 gap-y-2">
          <div className="relative">
            <img
              src="/userIcon.jpg"
              alt=""
              className="bg-[#F4F4F5] w-24 h-24 rounded-full"
            />
          </div>
          <p className="text-md">
            {aluno.nome.split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="text-sm">{aluno.tel}</p>
        </div>
        <div className="border-r border-[#f4f4f521] w-1/2">
          <h1 className="flex justify-center text-xl py-4">
            Informacoes do Aluno:
          </h1>
          <InfoAluno title="Nome" content={aluno.nome} />
          <InfoAluno title="Cliente desde" content={dataFormatada} />
          <InfoAluno title="Sexo" content={sexoFormatado} />
          <div className="w-4/5 flex justify-between mx-auto mb-2 gap-x-8">
            <InfoAluno title="IMC" content={CalcularIMC} />
            <InfoAluno title="Condicao" content={aluno.condicoes} />
          </div>
          <div className="w-4/5 flex justify-between mx-auto mb-2 gap-x-8">
            <InfoAluno title="Altura" content={alturaFormatada} />
            <InfoAluno title="Peso" content={aluno.peso} />
          </div>
          <InfoAluno title="Objetivo" content={aluno.objetivo} />
        </div>
        <div className="w-1/3">
          <h1 className="flex justify-center text-xl py-4">Financeiro</h1>
          <InfoAluno title="Plano" content={aluno.plano} />
          <InfoAluno title="Status" content={aluno.status} />
          <InfoAluno
            title="Proximo pagamento"
            content={aluno.status !== "ativo" ? dataPagamentoFormatada : "N/A"}
          />
          <ScrollArea className="mx-4 h-[200px]">
            <h1 className="flex justify-center">Historico de Pagamentos :</h1>
            <div className="border border-[#f4f4f521] py-2">
              <div className="flex justify-between ml-6 mr-10">
                <p>Data:</p>
                <p>Valor:</p>
              </div>
              {historicoPagamentos.map((item) => (
                <div className="flex justify-between ml-6 mr-10">
                  <p>{item.data}</p>
                  <p>{item.valor}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AlunoPage;
