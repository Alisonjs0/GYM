import { ListInfoProps } from "./ListInfo";

interface MenuListProps {
    nome: string;
    contato: string;
    plano: string;
    status: string;
    className?: string;
}

export default function MenuList ({ nome, contato, plano, status, className }: MenuListProps) {
    return (
        <div className={`${className} flex justify-between px-8 py-4 rounded-xl mb-4 drop-shadow-xl font-bold`}>
            <p className="text-[#F4F4F5] w-1/2">{nome}</p>
            <p className="text-[#F4F4F5] w-1/4">{contato}</p>
            <p className="text-[#F4F4F5] w-1/3">{plano}</p>
            <span className={`w-1/6 text-[#F4F4F5]`}>{status}</span>
        </div>
    )
}