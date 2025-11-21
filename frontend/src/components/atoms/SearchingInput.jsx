import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchingInput.css";
import { IoSearch } from "react-icons/io5";


export const SearchingInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/result?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
      setQuery("");
    }
  };

  return (
    <form className="input-wrapper" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar películas o series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        type="submit"
        className="input-icon"
        disabled={query.trim().length < 2}
      >
        <IoSearch />
      </button>
    </form>
  );
};
