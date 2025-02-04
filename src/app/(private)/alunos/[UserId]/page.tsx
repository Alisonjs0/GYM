"use client";

import { useParams } from "next/navigation";

import { useUpdate } from "@/hooks/useUpdate";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

import InfoAluno from "@/app/components/InfoAluno";

import { ScrollArea } from "@/components/ui/scroll-area";

import { IoIosClose } from "react-icons/io";

import { useRouter } from "next/navigation";

const AlunoPage = () => {
  const { UserId: id } = useParams();
  const { documents: alunos, loading } = useFetchDocuments("alunos");

  const { setIdAluno, atualizar } = useUpdate();

  const handleUpdate = async (alunoId: string, pagamentos: object) => {
    setIdAluno(alunoId);
    await atualizar({ pagamentos });
  };

  const router = useRouter();

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

  return (
    <div className="ml-[25vw] mr-[5vw] h-screen overflow-hidden flex items-center text-[#F4F4F5]">
      <div className="h-[80%] w-[100%] bg-[#232241] rounded-lg flex relative">
        <IoIosClose
          className="absolute top-2 right-2 w-10 h-10 cursor-pointer"
          onClick={() => router.back()}
        />
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
          <h1 className="flex justify-center">Historico de Pagamentos :</h1>
          <div className="flex justify-between ml-6 mr-6 border border-[#f4f4f521] py-2 px-4 mt-2 w">
            <p>Data:</p>
            <p>Valor:</p>
          </div>
          <ScrollArea className="h-[30%] w-[100%]">
            {aluno.pagamentos && aluno.pagamentos.length > 0 ? (
              console.log(aluno.pagamentos),
              aluno.pagamentos.map((pagamento: any, index: any) => (
                <div key={index} className="flex justify-between text-sm mb-2">
                  <p>{new Date(pagamento.data).toLocaleDateString("pt-BR")}</p>
                  <p>{pagamento.valor} R$</p>
                </div>
              ))
            ) : (
              <p className="text-center text-sm">
                Nenhum pagamento registrado.
              </p>
            )}
          </ScrollArea>
          <button
            onClick={() => {
              handleUpdate(aluno.id, {
                pagamentos1: [
                  {
                    data: new Date().toLocaleDateString(),
                    valor: aluno.valorPlano,
                    status: aluno.status
                  },
                ],
              });
            }}
          >
            Teste
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlunoPage;
