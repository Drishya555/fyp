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
import Dashboardsidebar from './pages/doctors/Dashboardsidebar.jsx'
import Docnewsidebar from './pages/doctors/docSidebar.jsx'
import Table from './pages/doctors/components/tablecomponent.jsx';
import MedicalRecord from './pages/medicalRecord.jsx'
import AddSchedule from './pages/doctors/AddSchedule.jsx';
import BookAppointmentTesting from './pages/BookAppointmentTesting.jsx'
const App = () => {
  return (
    <>
      <Routes>
        {/* All user view */}
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
      <Route path="/pharmacy/:slug" element={<SingleMedicine />} />
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/medical-record/:id' element={<MedicalRecord/>}></Route>


      {/* doctor view */}
      <Route path='/profile' element={<Docnewsidebar/>}></Route>
      <Route path='/doctor-dashboard' element={<Dashboardsidebar/>}></Route>
      <Route path='/table' element={<Table/>}></Route>
      <Route path='/changeschedule' element={<AddSchedule/>}></Route>
      <Route path='/bb' element={<BookAppointmentTesting/>}></Route>

      </Routes>
    </>
  )
}

export default App
