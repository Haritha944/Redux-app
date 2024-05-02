import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/users/UserSlice';
import { default_profile_link } from '../../assets/defaultprofile';
import './AdminEdit.css'

const AdminEditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_image: null,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch user details based on userId
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      // Fetch user details from API based on userId
      const response = await axios.get(`/api/users/${userId}`);
      setFormData({
        user_image: response.data.user_image || null,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        password: '', // Initialize password field with empty string
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const updateUserDetails = async () => {
    try {
      // Update user details in the backend
      const response = await axios.put(`/api/users/${userId}`, formData);
      // Dispatch action to update user details in Redux store
      dispatch(updateUser(response.data));
      // Redirect or show notification after successful update
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <Layout>
      <div className='maindivedituser'>
        <div className='detailsedit'>
          <h2>Edit User Details</h2>
          <div className=''>
            <img src={formData.user_image || default_profile_link} alt='Profile' />
            <div className='boxfordata'>
              <input
                type='file'
                className='form-control'
                id='profile-img'
                onChange={(e) => setFormData({ ...formData, user_image: e.target.files[0] })}
              />
              <label htmlFor='firstname'>Enter the firstname</label>
              <input
                type='text'
                name='first_name'
                id='firstname'
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <label htmlFor='lastname'>Enter the Lastname</label>
              <input
                type='text'
                name='lastname'
                id='lastname'
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
              <label htmlFor='email'>Enter the Email</label>
              <input
                type='text'
                name='email'
                id='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button class='mt-3'onClick={updateUserDetails}>s</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEditUser;
