import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

export const useFetchPayments = async () => {
  const alunosRef = collection(db, "alunos");
  const alunosSnapshot = await getDocs(alunosRef);

  const alunosData = [];

  for (const alunoDoc of alunosSnapshot.docs) {
    const aluno = {
      id: alunoDoc.id,
      ...alunoDoc.data(),
    };

    // Pegar os pagamentos de cada aluno
    const pagamentosRef = collection(alunoDoc.ref, "pagamentos");
    const pagamentosSnapshot = await getDocs(pagamentosRef);

    const pagamentosData = pagamentosSnapshot.docs.map((pagamentoDoc) => ({
      id: pagamentoDoc.id,
      ...pagamentoDoc.data(),
    }));

    alunosData.push({
      aluno,
      pagamentos: pagamentosData,
    });
  }

  return alunosData;
};
