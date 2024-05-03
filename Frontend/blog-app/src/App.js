import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import HomePage from './Containers/HomePage';
import LoginPage from './Containers/LoginPage';
import RegisterPage from './Containers/RegisterPage';
import Navbar from './Components/Navbar';
import { Provider } from 'react-redux';
import Dashboard from './Components/AdminDashBoard/Dashboard';
import Admin from './Components/Admin';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {store} from './app/store';
import EditHome from './Components/Home/EditHome';
import AdminCreate from './Components/AdminDashBoard/AdminCreate';
import AdminEdit from './Components/AdminDashBoard/AdminEdit'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
       <Router>
        
        <Routes>
          <Route path ='/' element={<Home/>}></Route>
          <Route path ='/admin' element={<Admin />}></Route>
          <Route path ='/admindashboard' element={<Dashboard />}></Route>
          <Route path ='/loginpage' element={<Login />}></Route>
          <Route path ='/registerpage' element={<Register />}></Route>
          <Route path ='/edituser' element={<EditHome />}></Route>
          <Route path ='/admin/create' element={<AdminCreate />}></Route>
          <Route path ='/admin/edit/:userId' element={<AdminEdit />}></Route>
          
        </Routes>
       </Router>
      </Provider>
     
    </div>
  );
}

export default App;
