import { MercadoPagoConfig, Payment } from "mercadopago";

import { NextResponse, type NextRequest } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
  options: { timeout: 5000 },
});


export async function POST(req: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const payment = new Payment(client);

  try {
    const { valor, nome, plano } = await req.json();

    if (!valor || valor <= 0) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
    }
    const body = {
      transaction_amount: valor,
      description: `Pagamento do aluno ${nome} referente ao plano ${plano}`,
      payment_method_id: "pix",
      payer: {
        email: "q0Jy5@example.com",
      },
    };

    const generateIdempotencyKey = () =>
      `${Date.now()}${Math.random().toString(36).substring(2, 15)}`;

    const requestOptions = {
      idempotencyKey: generateIdempotencyKey(),
    };

    let result;
    await payment
      .create({ body, requestOptions })
      .then((response) => {
        console.log(response);
        result = response?.point_of_interaction?.transaction_data?.ticket_url;
      })
      .catch(console.log);

    return Response.json({ qrcode: result });
  } catch (error) {
    console.error("Erro ao processar o pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao processar o pagamento" },
      { status: 500 }
    );
  }
}
