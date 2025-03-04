import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../Redux/UserSlice'; // Action to store user data
import BackImage  from '../../assets/penguin-walking-frozen-beach_181624-50490.jpg'

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form data
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // store image URL or null
  const [password, setPassword] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create object URL from the file
      setProfilePicture(fileURL); // Set the profile picture URL state
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic form validation
    if (!email || !password || !firstName || !lastName || !phone || !retypePassword) {
      message.error('Please fill in all fields');
      return;
    }

    if (password !== retypePassword) {
      message.error('Passwords do not match');
      return;
    }

    // Create user object
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      phone,
      profilePicture,
    };

    // Dispatch the action to save user in Redux store
    dispatch(createUser(newUser));

    // Show success message
    message.success('Sign up successful!');

    // Redirect to home page ("/") after successful sign-up
    navigate('/');
  };

  return (
    <div className='flex justify-end h-fit items-center w-full pr-10 py-5'
      style={{
        backgroundImage: `url(${BackImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'fit-content',
      }}   
    >
      <div className="w-[50%] p-6 bg-white rounded-lg shadow-md backdrop-blur-md bg-opacity-50 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <Form layout="vertical">
          <div className='flex  items-center'>
            <Form.Item className='w-full' label="First Name" name="firstName" 
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                className=" border-2 p-3 rounded-md" />
            </Form.Item>

            <Form.Item className='w-full' label="Last Name" name="lastName" 
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} 
                className="border-2 p-3 rounded-md" />
            </Form.Item>
          </div>
          

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 p-3 rounded-md" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="border-2 p-3 rounded-md" />
          </Form.Item>

          <Form.Item label="Profile Picture" name="profilePicture">
            <Input type="file" onChange={handleFileChange} className="border-2 p-3 rounded-md" />
            {profilePicture && <img src={profilePicture} alt="Profile Preview" className="mt-4 rounded-full w-32 h-32" />}
          </Form.Item>

          <div className='flex  items-center'>
            <Form.Item className='w-full' label="Password" name="password" 
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} 
                className="border-2 p-3 rounded-md" />
            </Form.Item>

            <Form.Item className='w-full' label="Retype Password" name="retypePassword" 
              rules={[{ required: true, message: 'Please retype your password!' }]}
            >
              <Input.Password value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} 
                className="border-2 p-3 rounded-md" />
            </Form.Item>
          </div>

          

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-3 h-10 flex items-center justify-center text-white
               bg-blue-500 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <span>Already have an account? <Link className='text-blue-500' to={'/'}>sign In</Link></span>
      </div>
    </div>
    
  );
};

export default SignUp;