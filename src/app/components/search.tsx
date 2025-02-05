import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import { FaSearch } from "react-icons/fa";

export interface SearchProps {
  className?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ className, setSearch }) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const normalizePhoneNumber = (phone: string) =>
    phone.replace(/[^a-zA-Z0-9]/g, "");

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim(); 
    value = normalizePhoneNumber(value); 
    setInputValue(value); 
  };

  useEffect(() => {
    setSearch(inputValue);
  }, [inputValue, setSearch]);

  return (
    <div className={`${className} flex justify-between items-center`}>
      {usePathname() === "/alunos" && (
        <div className="flex gap-4 mr-4">
          <button
            onClick={() => setSearch("Ativo")}
            className="bg-[#232241] text-[#f4f4f4] px-4 py-2 rounded-lg"
          >
            Ativo
          </button>
          <button
            onClick={() => setSearch("Inativo")}
            className="bg-[#232241] text-[#f4f4f4] px-4 py-2 rounded-lg"
          >
            Inativos
          </button>
          <button
            onClick={() => setSearch("Pendente")}
            className="bg-[#232241] text-[#f4f4f4] px-4 py-2 rounded-lg"
          >
            Pendentes
          </button>
          <button
            onClick={() => setSearch("")}
            className="bg-[#232241] text-[#f4f4f4] px-4 py-2 rounded-lg"
          >
            Todos
          </button>
        </div>
      )}
      <input
        id="search"
        type="text"
        placeholder="Pesquisar"
        className="px-4 py-2 text-[#F4F4F5] rounded-l-lg"
        onChange={validateInput}
      />
      <button className="px-4 py-3 rounded-r-lg">
        <FaSearch className="text-[#F4F4F5]" />
      </button>
    </div>
  );
};

export default Search;
