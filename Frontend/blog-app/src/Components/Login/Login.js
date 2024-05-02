import React, { useState } from 'react';
import Layout from '../Layout';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/users/UserSlice';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const check = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const loginpage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const login = async () => {
    if (!user.email || !user.password) {
      setErrors({ ...errors, email: 'Email and password are required' });
      return; 
    }

    try {
      const decodedToken = await dispatch(userLogin(user));
      // console.log("this is my admin",decodedToken.payload.is_active);

      if (!decodedToken.payload.is_admin && decodedToken.payload.is_active) {
        navigate('/');
      }
      else if (decodedToken.payload.is_admin == true) {
        setErrors({ ...errors, email: 'Only users are allowed to log in.' });
      }
      else if(decodedToken.payload.is_active == false) {
        setErrors({ ...errors, email: 'Your account is blocked.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.message === "Request failed with status code 401") {
        setErrors({ ...errors, email: 'Invalid email or password. Please try again.' });

      } else {
        setErrors({ ...errors, email: 'An error occurred. Please try again.' });
      }
    }
  };



  return (
    <>
      <Layout title='Auth | Login | Login Dashboard' content='Login Dashboard page'>
        <div className='alignment'>
          <div className='loginContainer'>
          <h2 className="text-center text-2xl  text-blue-500 font-bold mb-1">LOGIN</h2>
            <div className={`data ${errors.email && 'error'}`}>
              <label htmlFor='email'>Email</label>
              <input
                onChange={loginpage}
                type='email'
                name='email'
                placeholder='Enter The email'
                id='email'
                className= {`border border-gray-300 px-3 py-1 rounded-md ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className='error-message'>{errors.email}</p>}
            </div>
            <div className='data'>
              <label htmlFor='password'>Password</label>
              <input
                onChange={loginpage}
                placeholder='Enter the password'
                type='password'
                name='password'
                id='Password' className='border border-gray-300 px-3 py-1 rounded-md'
              />
            </div>
            <div className='button'>
              <button className='bg-green-700 px-4 py-1 rounded-xl' type='submit' onClick={login}>
                Login
              </button>
            </div>
            <p className='text-center text-sm pb-3'>Dont have an account? 
            <Link className='underline text-blue-800' to='/registerpage'>Register</Link></p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;