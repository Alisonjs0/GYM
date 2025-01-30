import { useState } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc, getDoc, addDoc, collection } from "firebase/firestore";

type AlunoData = {
  nome?: string;
  altura?: string;
  peso?: string;
  plano?: string;
  status?: string;
};

export const useUpdate = () => {
  const [idAluno, setIdAluno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const addAluno = async (data: { nome: string }) => {
    const alunosRef = collection(db, "alunos");
    const docRef = await addDoc(alunosRef, data);
  
    console.log("Documento adicionado com ID:", docRef.id); // ID gerado automaticamente
  };


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

  return {
    setIdAluno,
    atualizar,
  };
};
