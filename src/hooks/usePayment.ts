import { useState, useEffect, useRef } from "react";

export function usePayment() {
  const [valor, setValor] = useState(0);
  const [nome, setNome] = useState("");
  const [plano, setPlano] = useState("");
  const [qrCode, setQrCode] = useState("");
  const isProcessing = useRef(false);

  const handleChangeInfo = (valor: number, nome: string, plano: string) => {
    setValor(valor);
    setNome(nome);
    setPlano(plano);
  };

  const processarPagamento = async () => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    try {
      const response = await fetch("/api/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valor, nome, plano }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar o pagamento");
      }
      const data = await response.json();
      setQrCode(`${data.qrcode}`);
    } catch (error) {
      console.log("Erro ao processar o pagamento:", error);
    }
  };

  useEffect(() => {
    if (qrCode) {
      const win = window.open(qrCode, "_blank");
      if (win) win.focus();
    }
  })

  return { processarPagamento, qrCode, handleChangeInfo };
}
