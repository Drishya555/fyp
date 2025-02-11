import {Routes, Route} from 'react-router-dom';
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
import Homepage from './pages/Homepage.jsx';
import Hospitals from './pages/Hospitals.jsx';
import Doctors from './pages/Doctors.jsx';
import Docsidebar from './components/DocSidebar.jsx'
import AppDashboard from './pages/appointments/AppDashboard.jsx';
import BookAppointment from './pages/appointments/BookAppointment.jsx';
import Pharmacy from './pages/pharmacy/Pharmacy.jsx';
import AllMedicines from './pages/pharmacy/AllMedicines.jsx';
import SingleMedicine from './pages/pharmacy/SingleMedicine.jsx';
import Cart from './pages/cart.jsx'
const App = () => {
  return (
    <>
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/hospitals' element={<Hospitals/>}></Route>
      <Route path='/doctors' element={<Doctors/>}></Route>
      <Route path='/test' element={<Docsidebar/>}></Route>
      <Route path='/appointment-dashboard' element={<AppDashboard/>}></Route>
      <Route path='/book-appointment' element={<BookAppointment/>}></Route>
      <Route path='/pharmacy' element={<Pharmacy/>}></Route>
      <Route path='/allmedicines' element={<AllMedicines/>}></Route>
      <Route path='/singlemedicine' element={<SingleMedicine/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>

      </Routes>
    </>
  )
}

export default App
