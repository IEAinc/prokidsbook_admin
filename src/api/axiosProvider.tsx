import { ReactNode } from 'react';
import axiosInstance from './axios';
import AxiosContext from './AxiosContext';

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;