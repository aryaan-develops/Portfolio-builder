import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // <--- Ye import karo
import axios from 'axios'

axios.defaults.baseURL = 'https://portfolio-api-otxm.onrender.com'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- Ye wrap karo */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)