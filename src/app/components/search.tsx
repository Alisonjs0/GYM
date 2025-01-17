import React from "react";

import { FaSearch, FaFilter  } from "react-icons/fa";

export interface SearchProps {
    className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={className}>
      <input type="text" placeholder="Pesquisar" className="px-4 py-2 text-[#F4F4F5] rounded-l-lg"/>
      <button className="px-4 py-2">
        <FaSearch className="text-[#F4F4F5]" />
      </button>
      <button className={`px-4 py-2 rounded-r-lg`}>
        <FaFilter className="text-[#F4F4F5]" />
      </button>
    </div>
  );
};

export default Search;
