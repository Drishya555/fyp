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
import Table from './pages/doctors/components/tablecomponent.jsx';
import AddSchedule from './pages/doctors/AddSchedule.jsx';
import BookAppointmentTesting from './pages/BookAppointmentTesting.jsx'
import Adminpage from './pages/admin/Adminpage.jsx';
import AddHospital from './pages/admin/AddHospital.jsx';
import DoctorDetails from './pages/DoctorDetails.jsx';
import HospitalDashboard from './pages/hospitals/HospitalSidebar.jsx'
import Side from './pages/Sidenav.jsx';
import HospitalDetails from './pages/HospitalDetails.jsx';
import AddDoctor from './pages/hospitals/AddDoctors.jsx';
import AddPharmacist from './pages/hospitals/AddPharmacists.jsx';
import ProfilePage from './pages/Profilepage.jsx';
import Authstore from './hooks/authStore.js';
import Company from './pages/Company.jsx';
import Pharmacists from './pages/pharmacy/Pharmacist/PharmacistSidebar.jsx'
import UserProfile from './pages/userProfile.jsx';
const App = () => {

  const userrole = Authstore.getUser()?.role || null;
  
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
      <Route path='/doctordetails/:id' element={<DoctorDetails/>}></Route>
      <Route path='/medical-record/:id' element={<Side/>}></Route>
      <Route path='/hospital-details/:id' element={<HospitalDetails/>}></Route>
      <Route path='/doctorprofile' element={<ProfilePage/>}></Route>
      <Route path='/company' element={<Company/>}></Route>
      <Route path='/profile' element={<UserProfile/>}></Route>

      {/*hospital view */}
      {userrole === 'hospital' && (
        <>
      <Route path='/adddoctor' element={<AddDoctor/>}></Route>
      <Route path='/addpharmacist' element={<AddPharmacist/>}></Route>
      <Route path='/hospital-dashboard' element={<HospitalDashboard/>}></Route>
      </>
      )}

      {/* doctor view */}
      
      {userrole === 'doctor' && (
  <>
    <Route path='/doctor-dashboard' element={<Dashboardsidebar />} />
    <Route path='/table' element={<Table />} />
    <Route path='/changeschedule' element={<AddSchedule />} />
    <Route path='/bb' element={<BookAppointmentTesting />} />
  </>
)}


      {/*  admin routes */}
      <Route path='/admin' element={<Adminpage/>}></Route>
      <Route path='/addhospital' element={<AddHospital/>}></Route>


      {/* Pharmacist View */}
      <Route path='/pharmacist-dashboard' element={<Pharmacists/>}></Route>


      </Routes>
    </>
  )
}

export default App
