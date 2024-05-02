import React from 'react';
import { NavLink, useNavigate,Link } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { logout } from '../features/users/UserSlice';



const Navbar = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    console.log(user)
    const handleLogout = () =>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtTokenadmin');
        dispatch(logout());
    };
    const guestLinks = (
        <>
        <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' to="/loginpage">
                Login
            </NavLink>
        </li>
        <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' to="/registerpage">
                Register
            </NavLink>
        </li>
        <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' to="/admin">
                Admin
            </NavLink>
        </li>
        </>
    );
    const userLinks = (
        <>
         <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' to="/">
                Profile
            </NavLink>
        </li>
        <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' onClick={handleLogout}>
                Logout
            </NavLink>
        </li>
        </>
    );
    const adminLinks=(
        <>
        <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' to='/admindashboard'>
                Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink className='bg-blue-500 rounded px-4 py-2 font-semibold text-lg' onClick={handleLogout}  to='/admin'>
                Admin Logout
            </NavLink>
        </li>
        
        </>
    );

    
  return (
    <div className='shadow py-5 sticky top-0 bg-slate-300'>
         <div className='flex justify-between mx-20 h-8'>
                <div>
                    <h1 className="text-black font-extrabold text-3xl">DA BLOGGER</h1>
                </div>
                <div className=' '>
                <ul className="list-none p-0 m-0 flex items-center gap-4">

                {user.superuser ? adminLinks : user.user ? userLinks : guestLinks}

                 </ul>
                </div>
            </div>
    </div>
  );
};

export default Navbar