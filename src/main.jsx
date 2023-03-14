import { ThemeProvider } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { StockCheckrApp } from './StockCheckrApp'
import './styles.css'
import { theme } from './theme/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <StockCheckrApp />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
