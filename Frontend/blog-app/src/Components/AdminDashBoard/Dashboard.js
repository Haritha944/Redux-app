import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout'
import './Admindash.css'
import { jwtDecode} from 'jwt-decode';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate ,NavLink} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../features/users/userApi';
import { updateSuperUser } from '../../features/users/UserSlice';

const Dashboard = () => {
    const [userData ,setUserData] = useState(null);
    const user = useSelector((state) => state.user)
    const navigate=useNavigate()
    const tokenAdmin = localStorage.getItem('jwtToken')
    const [isLoading,setIsLoading] = useState(true);
    let decodedAdminToken;
    const dispatch = useDispatch()
    const [users,setUsers]=useState([])
    const [searchTerm,setSearchTerm] = useState('')
    const [status,setStatus] = useState('')

    if (tokenAdmin){
        decodedAdminToken = jwtDecode(tokenAdmin)
    }
    useEffect(()=>{
        if (!tokenAdmin){
            navigate('/admindashboard')
        }else{
            adminUserDetails();
            getUserlist();
        }
    },[tokenAdmin]);
    useEffect(()=>{
        if(!user.superuser && !isLoading){
            setTimeout(()=> navigate('/admin'))
        }
    },[user.superuser,isLoading]);

    async function adminUserDetails(){
        try{
            const response = await axios.get(`${BASE_URL}/users/user-detail/${decodedAdminToken.user_id}`,{is_active:false})
            dispatch(updateSuperUser(response.data));
        }catch(error){
            console.error('Error fetching user details',error);
        }finally{
            setIsLoading(false);
        }
    }

    async function getUserlist(){
        const request =await axios.get(`${BASE_URL}/users/user-list/`);
        setUsers(request.data);
    }

    async function getData(){
        const request = await axios.get(`${BASE_URL}/users/user-list/?search=${searchTerm}`);
        setUsers(request.data)
        console.log('This is the search term',request.data)
    }

    async function block_Or_Unblock_User(id,currentStatus){
        try{
            const newStatus = !currentStatus;
            const response = await axios.patch(`${BASE_URL}/users/user-detail/${id}/`,{is_active:newStatus});
            dispatch(updateSuperUser(response.data));
            setUsers(prevUsers => prevUsers.map(user =>(user.id === id ? {...user,is_active:newStatus}:user)));
        }catch(error){
            console.error('Error blocking/unblocking user:',error);
        }
    }
  return (
    <>
     <Layout>
                {isLoading ? <p>Loading....</p> : <p>Admin</p>}
                {
                    user.superuser ? (
                        <div className='flex justify-around mt-12'>
                            <div className="table-responsive">
                                <div className='searchBox'>
                                    <input value={searchTerm} placeholder='Enter the search input' onChange={(e) => { setSearchTerm(e.target.value); getData(user.id,user.is_active) }} type="text" name="" id="" />
                                    {/* <a>Search</a> */}
                                </div>
                                <table className="table table-primary w-full border-collapse">
                                    <thead class="h-1">
                                        <tr class="align-center h-10">
                                            <th scope="col">No</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">FirstName</th>
                                            <th scope="col">LastName</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Change Status</th>
                                            <th scope="col">Edit Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => ( 
                                            <tr className=''>
                                                <td>{index + 1}</td>
                                                <td><img src={user.user_image} alt="NO PROFILE PIC." /></td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.is_active ? 'True' : 'False'}</td>
                                                <td><a className='text-red-700 font-bold cursor-pointe' onClick={() => block_Or_Unblock_User(user.id,user.is_active ? true : false)}>{user.is_active ? "Block" : "UnBlock"}</a></td>
                                                <td><NavLink className='edituser' to={`/admin/edit/${user.id}`}>Edit</NavLink></td>
                                                
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <button onClick={() => navigate('/admin/create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>

                        </div>

                    ) : (<p className='errorfornotlogin'>Your not Logged In Please Login in first</p>
                    )
                }

            </Layout>
    </>
  )
}

export default Dashboard