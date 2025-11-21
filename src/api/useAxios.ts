import { useContext } from 'react';
import AxiosContext from './AxiosContext';

const useAxios = () => {
  return useContext(AxiosContext);
};

export default useAxios;