import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePayment() {

    const router = useRouter();

    const [valor, setValor] = useState(0);
    const [nome, setNome] = useState('');
    const [plano, setPlano] = useState('');
    const [qrCode, setQrCode] = useState('');

    const handleChangeInfo = (valor: number, nome: string, plano: string ) => {
        setValor(valor);
        setNome(nome);
        setPlano(plano);
        processarPagamento();
      };

    useEffect(() => {
        if (qrCode) {
            router.push(qrCode);
        }
    }, [qrCode]);

    const processarPagamento = async () => {
        try {
            const response = await fetch('/api/mercadopago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ valor, nome, plano }),
            });

            if (!response.ok) {
                throw new Error('Erro ao processar o pagamento');
            }
            const data = await response.json();
            setQrCode(`${data.qrcode}`)
        } catch (error) {
            console.error('Erro ao processar o pagamento:', error);
            alert('Erro ao processar o pagamento');
        }
        }

        return {processarPagamento, qrCode, handleChangeInfo};
    };
