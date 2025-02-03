import { useState, useEffect } from "react";

export function usePayment() {
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
            window.open(qrCode);
        }
    }, [qrCode]);

    useEffect(() => {
        if (valor > 0 && nome && plano) {
            processarPagamento();
        }
    }, [valor, nome, plano]);

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
            console.log('Erro ao processar o pagamento:', error);
        }
        }

        return {processarPagamento, qrCode, handleChangeInfo};
    };
