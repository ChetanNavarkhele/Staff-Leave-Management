import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StaffHome from './StaffHome';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import HODHome from './HODHome';


const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/stafflogin' element={<StaffHome />}></Route>
          <Route path='/hodlogin' element={<HODHome />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
