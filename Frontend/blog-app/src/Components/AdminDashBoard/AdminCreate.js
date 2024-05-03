
import React,{useState} from 'react'
import Layout from '../Layout'
import { userRegistration } from '../../features/users/UserSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Admincreate.css'
import validator from 'validator'

const AdminCreate = () => {
    const registrationError = useSelector((state)=> state.user.error)
  const registeredUser = useSelector((state)=>state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData,setFormdata]= useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    repeatpassword:'',
  });
  const [errors,setErrors]= useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    repeatpassword:'',
  });
  const handleInputChange = (e) =>{
    setFormdata({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const validateForm =()=>{
    const{first_name,last_name,email,password,repeatpassword} = formData;
    const newErrors = {};
    if (!validator.isEmail(email)){
      newErrors.email='Please enter a valid email address'
    }
    if (!validator.isLength(password,{min:6})){
      newErrors.password='Password must be atleast 6 characters long';
    }
    if (!validator.equals(password,repeatpassword)){
      newErrors.repeatpassword='Password do not match';
    }
    if (!validator.isAlpha(first_name)){
      newErrors.first_name='Only contains letters on firstname';
    }
    if (validator.isEmpty(first_name)){
      newErrors.first_name='First name not empty';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length==0;
  };

  const registerUser = () => {
    if (validateForm()) {
        dispatch(userRegistration(formData))
            .then(() => {
                navigate('/admindashboard');
            });
    }
};

  return (
    <>
    <Layout  title='Auth | Login | Register Window' content='Register Window'>
        <div className='alignment'>
            <div className='signContainer'>
            <h2 className="text-center text-2xl  text-blue-500 font-bold mb-2">Create User</h2>
                <div className='registration'>
                    {registeredUser && (
                        <div className='reg'>
                            <p>User successfully registered:</p>
                        </div>
                    )}
                </div>
                <div className={`data ${errors.email && 'error'}`}>
                    <label id='email' htmlFor=''>Enter the Email Address</label>
                    <input type='text' onChange={handleInputChange} placeholder='Enter the email' name='email' id='email' className= {`border border-gray-300 px-3 py-1 rounded-md ${errors.email ? 'border-red-500' : ''}`}/>
                    {errors.email && <p className='error-message'>{errors.email}</p>}
                </div>
                <div className={`data ${errors.first_name && 'error'}`}>
                    <label id='first_name' htmlFor=''>Enter the firstname</label>
                    <input type='text' onChange={handleInputChange} name='first_name' placeholder='Enter the firstname' id='first_name' className={`border border-gray-300 px-3 py-1 rounded-md ${errors.first_name ? 'border-red-500' : ''}`}  />
                    {errors.first_name && <p className='error-message'>{errors.first_name}</p>}
                </div>
                <div className={`data ${errors.last_name && 'error'}`}>
                    <label id='last_name' htmlFor=''>Enter the lastname</label>
                    <input type='text' onChange={handleInputChange} name='last_name' placeholder='Enter the lastname' id='last_name' className={`border border-gray-300 px-3 py-1 rounded-md ${errors.last_name ? 'border-red-500' : ''}`} />
                    {errors.last_name && <p className='error-message'>{errors.last_name}</p>}
                </div>
                <div className={`data ${errors.password && 'error'}`}>
                    <label id='password' htmlFor=''>Enter the password</label>
                    <input type='password' onChange={handleInputChange} name='password' placeholder='Enter the password' id='password' className={`border border-gray-300 px-3 py-1 rounded-md ${errors.password ? 'border-red-500' : ''}`} />
                    {errors.password && <p className='error-message'>{errors.password}</p>}
                </div>
                <div className={`data ${errors.repeatpassword && 'error'}`}>
                    <label id='repeatpassword' htmlFor=''>Enter the repeatpassword</label>
                    <input type='password' onChange={handleInputChange} name='repeatpassword' placeholder='Enter the repeatpassword' id='repeatpassword' className={`border border-gray-300 px-3 py-1 rounded-md ${errors.repeatpassword ? 'border-red-500' : ''}`} />
                    {errors.repeatpassword && <p className='error-message'>{errors.repeatpassword}</p>}
                </div>
                <div className='button'>
                    <button className="bg-green-700 px-4 py-1 rounded-xl" onClick={registerUser}>Register</button>
                    {registrationError && <p className='error-message'>Error: {registrationError}</p>}
                </div>
                
            </div>
        </div>
    </Layout>
</>
  )
}

export default AdminCreate