import { useState } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc, getDoc, collection, addDoc} from "firebase/firestore";

type AlunoData = {
  nome?: string;
  altura?: string;
  peso?: string;
  plano?: string;
  status?: string;
  pagamentos?: object;
};

export const useUpdate = () => {
  const [idAluno, setIdAluno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [newPaymentId, setNewPaymentId] = useState<string | null>(null);

  // const addAluno = async (data: { nome: string }) => {
  //   const alunosRef = collection(db, "alunos");
  //   const docRef = await addDoc(alunosRef, data);
  
  //   console.log("Documento adicionado com ID:", docRef.id); // ID gerado automaticamente
  // };


  const atualizar = async (data: AlunoData) => {
    if (!idAluno) {
      console.error("Erro: ID do aluno não foi definido.");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, "alunos", idAluno);
      
      const docSnap = await getDoc(docRef); 

      if (!docSnap.exists()) {
        console.error(`Erro: Nenhum aluno encontrado com o ID ${idAluno}`);
        setLoading(false);
        return;
      }

      await updateDoc(docRef, data);
      console.log("Aluno atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    } finally {
      setLoading(false);
    }
  };

  const criarPagamento = async (data: object) => {
    try {
      const docRef = doc(db, "alunos", idAluno);
      const paymentRef = collection(docRef, "pagamentos");
      const newPayment = await addDoc(paymentRef, data);
      setNewPaymentId(newPayment.id);
      console.log("Novo pagamento:", newPayment.id);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
    }
  };

  return {
    setIdAluno,
    atualizar,
    loading,
    criarPagamento,
    newPaymentId
  };
};
