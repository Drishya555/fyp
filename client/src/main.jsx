import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' 
import { BrowserRouter } from 'react-router-dom'
import Header from './Layout/Header'
import Footer from './Layout/Footer'

// Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header/>
    <App />
    <Footer/>
  </BrowserRouter>,
)