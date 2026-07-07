import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TrustProvider } from './context/TrustContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TrustProvider>
      <App />
    </TrustProvider>
  </React.StrictMode>,
)