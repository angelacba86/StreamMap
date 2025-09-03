import "./SearchingInput.css";
import { IoSearch } from "react-icons/io5";

export const SearchingInput = () => {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder="Buscar aquí..." />
      <button className="input-icon">
        <IoSearch />
      </button>
    </div>
  );
};
