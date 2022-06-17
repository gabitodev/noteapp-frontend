import { useContext } from 'react';
import FilterContex from '../context/FilterProvider';

const useFilter = () => {
  return useContext(FilterContex);
};

export default useFilter;