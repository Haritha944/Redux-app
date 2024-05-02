import React ,{useState} from 'react'
import Layout from '../Components/Layout'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { superUserLogin } from '../features/users/UserSlice'
import { jwtDecode } from 'jwt-decode'

const Admin = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const check = useSelector((state)=>state.user)
  const [adminUser,setAdminUser]=useState({
    email:'',
    password:'',
  });
  const [errors,setErrors]=useState({
    email:'',
    password:'',
  });
  const loginpage = (e) =>{
    setAdminUser({ ...adminUser,[e.target.name]:e.target.value});
    setErrors({ ...errors,[e.target.name]:''});
  }

  const adminLogin= async()=>{
    if(!adminUser.email || !adminUser.password){
      setErrors({...errors,email:'Email and password are required'});
      return;
    }
    try{
      const decodedToken = await dispatch(superUserLogin(adminUser));
      if(decodedToken.payload.is_admin){
        navigate("/admindashboard");
      }
      else if (decodedToken.payload.is_admin == false) {
        setErrors({ ...errors, email: 'Only admins are allowed to log in.' });
    }
    else {
        setErrors({ ...errors, email: 'Only admins are allowed to log in.' });
    }
    }catch(error){
      console.error('login error:',error);
      if(error.response && error.message === "Request failed with status code 401"){
        setErrors({...errors,email:'Invalid email or password.Please try again.'})
      }else{
        setErrors({...errors,email:'An error occured.Please try again.'})
      }
    }
  }
  return (
    <>
     <Layout>
                <div className='mx-auto mt-16 shadow-lg w-96 bg-slate-200 rounded-lg'>
                    <div className='flex flex-col mx-auto p-5'>
                        <div>
                            <p className="text-center uppercase font-bold text-2xl pt-3">Admin Login</p>
                        </div>
                        <div className='errmessage'>
                            {/* <p>{err}</p> */}
                        </div>
                        <div className="flex flex-col space-y-2">
                        <div className="flex flex-col ">
                            <label htmlFor="email">Email *</label>
                            <input onChange={loginpage} type="email" name="email" placeholder='Enter The email' id="email" className='px-3 py-1'/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Password *</label>
                            <input onChange={loginpage} placeholder='Enter the password' type="password" name="password" id="Password" className='px-3 py-1' />
                        </div>
                        <div className="flex flex-col">
                            <button onClick={adminLogin} className="mt-2 bg-green-700 py-1 px-3 rounded-xl text-white font-semibold text-lg shadow-md" type='button'>Login</button>
                        </div>
                        </div>
                        
                        <p className='text-center text-sm pb-3'>Dont have an account?</p>
                    </div>
                </div>
            </Layout>
    </>
  )
}

export default Admin