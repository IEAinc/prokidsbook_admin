import { createContext } from 'react';
import axiosInstance from './axios';

const AxiosContext = createContext(axiosInstance);
export default AxiosContext;