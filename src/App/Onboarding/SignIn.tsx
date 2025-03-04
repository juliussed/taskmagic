import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button, Form, message } from 'antd';
import { RootState } from '../../Redux/store'; // Assuming RootState is defined for Redux store
import { Link, useNavigate } from 'react-router-dom';
import BackImage  from '../../assets/image3.png'

const SignIn: React.FC = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the user data from the Redux store (from sign-up)
  const storedUser = useSelector((state: RootState) => state.user);

  // Local state for form data
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handle form submission
  const handleSubmit = () => {
    if (!email || !password) {
      message.error('Please fill in both fields');
      return;
    }

    // Check if the stored user data exists
    if (storedUser.email === email && storedUser.password === password) {
      message.success('Sign in successful!');
      navigate('/homepage');
      // You can dispatch an action or set the user as authenticated here
      // Example: dispatch(loginSuccess(storedUser)); // If you want to manage authentication state
    } else {
      message.error('Invalid credentials');
    }
  };

  return (
    <div className='flex justify-end items-center w-full pr-10'
      style={{
        backgroundImage: `url(${BackImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}   
    >
      <div className="w-[35%] p-6 backdrop-blur-md bg-white bg-opacity-50  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <Form layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 h-10 flex items-center justify-center 
            text-white bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <span>Dont have an account? <Link className='text-blue-500' to={'/sign-up'}>sign Up</Link></span>
    </div>
    </div>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default SignIn;