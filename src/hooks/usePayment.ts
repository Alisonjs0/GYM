import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function usePayment() {
  const [qrCode, setQrCode] = useState("");

  const handleChangeInfo = async (
    valor: number,
    nome: string,
    plano: string
  ) => {
    console.log(valor, nome, plano);
    const result = await Swal.fire({
      title: "Confirma o pagamento?",
      text: `Valor: R$ ${valor.toFixed(2)}\nNome: ${nome}\nPlano: ${plano}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, confirmar!",
    })

    if (result.isConfirmed) {
      await processarPagamento(valor, nome, plano);
    }
  };

  const processarPagamento = async (valor: number, nome: string, plano: string) => {
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
      Swal.fire({
        title: "Erro!",
        text: "Falha ao processar o pagamento. Tente novamente.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (qrCode) {
      const win = window.open(qrCode, "_blank");
      if (win) win.focus();
    }
  }, [qrCode]);

  return { qrCode, handleChangeInfo };
}
