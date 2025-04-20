import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' 
import { BrowserRouter } from 'react-router-dom'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header/>
    <App />
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Footer/>
  </BrowserRouter>,
)