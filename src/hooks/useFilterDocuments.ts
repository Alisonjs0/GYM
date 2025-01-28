import { useEffect, useState } from "react";
import { getPerformance, trace } from "firebase/performance";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config"; // Presumindo que você tenha configurado corretamente o Firestore

export default function useFilter (traceName: string, filterCriteria: string) {
  const [isStarted, setIsStarted] = useState(false);
  const [traceInstance, setTraceInstance] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const perf = getPerformance();
    const traceInstance = trace(perf, traceName);
    setTraceInstance(traceInstance);

    if (isStarted) {
      traceInstance.start();
    }

    return () => {
      if (traceInstance) {
        traceInstance.stop();
      }
    };
  }, [traceName, isStarted]);

  const startTrace = () => {
    if (!isStarted && traceInstance) {
      traceInstance.start();
      setIsStarted(true);
    }
  };

  const stopTrace = () => {
    if (isStarted && traceInstance) {
      traceInstance.stop();
      setIsStarted(false);
    }
  };

  const filterData = async () => {
    setLoading(true);
    startTrace(); 

    try {
      const q = query(
        collection(db, "items"),
        where("category", "==", filterCriteria)
      );

      const querySnapshot = await getDocs(q); // Executa a consulta
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFilteredData(data);
    } catch (error) {
      console.error("Erro ao filtrar dados:", error);
    } finally {
      setLoading(false);
      stopTrace();
    }
  };

  return { filteredData, filterData, loading, startTrace, stopTrace };
};
