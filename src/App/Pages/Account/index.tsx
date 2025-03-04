import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { updateUser } from '../../../Redux/UserSlice';
import { Input, Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Account: React.FC = () => {
  const dispatch = useDispatch();

  // Access user data from Redux store
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.settings.theme); // Get theme from Redux state

  // Local state for the form values
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState(user.password);
  const [retypePassword, setRetypePassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  // File change handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const fileURL = URL.createObjectURL(file);
      setProfilePicture(fileURL); // Update profile picture URL
    }
  };

  // Save user details
  const handleSave = () => {
    // Validation
    if (password !== retypePassword) {
      message.error('Passwords do not match');
      return;
    }

    const updatedUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
      profilePicture,
    };

    dispatch(updateUser(updatedUser)); // Update the user in Redux
    message.success('Account updated successfully!');
  };

  // Apply the theme to the body when theme changes
  useEffect(() => {
    // Apply the theme class to the body tag
    document.body.className = theme; // Will apply 'light' or 'dark' class to body
  }, [theme]);

  return (
    <body className="w-[70%] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Account</h2>

      <Form layout="vertical">
        <Form.Item label="First Name">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 p-3 rounded-md"
            disabled
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Profile Picture">
          <Upload
            listType="picture"
            showUploadList={false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
          {profilePicture && (
            <img src={profilePicture} alt="Profile Preview" className="mt-4 rounded-full w-32 h-32" />
          )}
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Retype Password">
          <Input.Password
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className="border-2 p-3 rounded-md"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSave}
            className="w-full py-3 h-10 flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </body>
  );
};

export default Account;
