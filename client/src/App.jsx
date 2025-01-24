import {Routes, Route} from 'react-router-dom';
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
const App = () => {
  return (
    <>
      <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>

      </Routes>
    </>
  )
}

export default App
