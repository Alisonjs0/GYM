import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full text-[#F4F4F5] ml-[20vw] flex flex-col justify-center items-center">
      <h1 className="text-[#F4F4F5] text-4xl mt-12">404</h1>
      <p>Página não encontrada</p>
      <Link
        href="/"
        className="bg-[#332280] px-6 py-4 rounded-lg mt-4"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
