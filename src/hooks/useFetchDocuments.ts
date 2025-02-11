import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  Query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

interface Document {
  id: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | number | null | any; 
}

export const useFetchDocuments = (
  docCollection: string,
  search: string | null = null,
  uid: string | null = null
) => {
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  // Deal with memory leak
  const [cancelled, setCancelled] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q: Query<DocumentData>;

        // Define a query para buscar os documentos

        if (search) {
          q = query(
            collectionRef,
            where("searchField", "==", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uidField", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(collectionRef, orderBy("nome"));
        }

        // Observa as alterações nos documentos
        const unsubscribe = onSnapshot(
          q,
          (querySnapshot: QuerySnapshot<DocumentData>) => {
            setDocuments(
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          },
          (error) => {
            console.error(error);
            setError(error.message);
          }
        );

        setLoading(false);

        // Retorna a função para cancelar o snapshot no cleanup
        return () => unsubscribe();
      } catch (error: unknown ) {
        if (error instanceof Error) {
          console.error(error);
          setError(error.message);
        } else {
          console.error("Erro desconhecido", error);
          setError("Erro desconhecido");
        }
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, error, loading };
};