import {Routes, Route} from 'react-router-dom';
import Appointment from './pages/Appointment';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Hospitals from './pages/Hospitals';
import Contact from './pages/Contact';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/appointment' element={<Appointment/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/services' element={<Services/>}></Route>
        <Route path='/hospitals' element={<Hospitals/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>

      </Routes>
    </>
  );
}

export default App;
