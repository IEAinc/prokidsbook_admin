//import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AxiosProvider from '../src/api/axiosProvider'
import './App.css'
import './locales/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AxiosProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AxiosProvider >
)