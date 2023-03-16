import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { StockCheckrApp } from './StockCheckrApp'
import { theme } from './theme/theme';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <StockCheckrApp />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
