import { MercadoPagoConfig, Payment } from "mercadopago";

import type { NextRequest } from "next/server";


const client = new MercadoPagoConfig({
  accessToken: "APP_USR-806565373522219-012519-b053260932f574be57bb836681f151b4-407875892", // Melhor usar variável de ambiente
  options: { timeout: 5000 },
})

export async function POST(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const payment = new Payment(client);

  const body = {
    transaction_amount: 100,
    description: "test",
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
}