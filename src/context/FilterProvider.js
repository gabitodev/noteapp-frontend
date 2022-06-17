import { createContext, useState } from 'react';

const FilterContex = createContext({});

export const FilterProvider = ({ children }) => {
  const [filteredNotes, setFilteredNotes] = useState([]);

  return (
    <FilterContex.Provider value={{ filteredNotes, setFilteredNotes }}>
      {children}
    </FilterContex.Provider>
  );
};

export default FilterContex;