import {Routes, Route} from 'react-router-dom';
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
import Homepage from './pages/Homepage.jsx';
import Hospitals from './pages/Hospitals.jsx';
import Doctors from './pages/Doctors.jsx';
import Sidebar from './components/Sidebar.jsx';
import AppDashboard from './pages/appointments/AppDashboard.jsx';
import BookAppointment from './pages/appointments/BookAppointment.jsx';
const App = () => {
  return (
    <>
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/hospitals' element={<Hospitals/>}></Route>
      <Route path='/doctors' element={<Doctors/>}></Route>
      <Route path='/test' element={<Sidebar/>}></Route>
      <Route path='/appointment-dashboard' element={<AppDashboard/>}></Route>
      <Route path='/book-appointment' element={<BookAppointment/>}></Route>

      </Routes>
    </>
  )
}

export default App
