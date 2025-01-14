'use client';

import { useState, useCallback } from "react";
import { Evento } from "../Interfaces/Evento";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AutocompleteProps {
  eventos: Evento[];
  onSelect: (evento: string) => void;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ eventos, onSelect }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Evento[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearch(query);

    if (query === "") {
      setSuggestions([]);
    } else {
      const filtered = eventos.filter((evento) =>
        evento.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [eventos]);

  const handleSelect = useCallback((selected: Evento) => {
    console.log(selected)
    setSearch(selected.nombre);
    setSuggestions([]);
    onSelect(selected.nombre);
  }, [onSelect]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsFocused(false), 200);
  }, []);



  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder="Escribe o selecciona un evento"
        className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.nombre} // Suponiendo que Evento tiene un campo único `id`
              onClick={() => handleSelect(suggestion)}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-green-100"
            >
              <FontAwesomeIcon icon={suggestion.icono} className="text-green-500" />
              <span>{suggestion.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
