import React, { useEffect, useState } from 'react';
import { Button, Form, Switch, message, Modal, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { 
  updateSettings, 
  toggleEmailNotifications, 
  toggleTwoFactorAuthentication, 
  toggleMarketingNotifications, 
  toggleActivityNotifications 
} from '../../../Redux/settingsSlice';
import { addNotification } from '../../../Redux/notificationSlice';

const { Option } = Select; // This is where Option is imported.

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const theme = useSelector((state: RootState) => state.settings.theme); // Get theme from Redux state
  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  // 🔹 Generic Toggle Handler (Now Correctly Handles Redux Actions)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (action: () => any, messageText: string) => {
    dispatch(action()); // Dispatch the action
    dispatch(addNotification({ message: messageText, read: false })); // Add notification with read status
  };

  // 🔹 Handle Save Settings (Ensuring Global State Updates)
  const handleSaveSettings = () => {
    dispatch(updateSettings(settings)); // Update settings
    dispatch(addNotification({ message: 'Settings updated successfully.', read: false })); // Add success notification
    message.success('Settings updated successfully!');
  };

  // 🔹 Handle Account Deletion
  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = () => {
    message.success('Account has been deleted.');
    dispatch(addNotification({ message: 'Account deleted.', read: false })); // Add delete notification
    setShowDeleteConfirmation(false);
  };

  // Apply the theme to the body when theme changes
    useEffect(() => {
      // Apply the theme class to the body tag
      document.body.className = theme; // Will apply 'light' or 'dark' class to body
    }, [theme]);

  return (
    <body className="w-[70%] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

      {/* Privacy Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Privacy Settings</h3>
        <Form.Item label="Email Notifications">
          <Switch 
            checked={settings.emailNotifications} 
            onChange={() => handleToggle(toggleEmailNotifications, 'Email notifications updated.')} 
          />
        </Form.Item>

        <Form.Item label="Enable Two-Factor Authentication">
          <Switch 
            checked={settings.twoFactorEnabled} 
            onChange={() => handleToggle(toggleTwoFactorAuthentication, 'Two-factor authentication updated.')} 
          />
        </Form.Item>

        {settings.twoFactorEnabled && (
          <div>
            <Form.Item label="Security Question">
              <Input 
                placeholder="Enter your security question"
                value={settings.securityQuestion}
                onChange={(e) => dispatch(updateSettings({ securityQuestion: e.target.value }))}
              />
            </Form.Item>
            <Form.Item label="Answer">
              <Input.Password
                placeholder="Enter your answer"
                value={settings.securityAnswer}
                onChange={(e) => dispatch(updateSettings({ securityAnswer: e.target.value }))}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <Form.Item label="Marketing Notifications">
          <Switch 
            checked={settings.marketingNotifications} 
            onChange={() => handleToggle(toggleMarketingNotifications, 'Marketing notifications updated.')} 
          />
        </Form.Item>

        <Form.Item label="Activity Notifications">
          <Switch 
            checked={settings.activityNotifications} 
            onChange={() => handleToggle(toggleActivityNotifications, 'Activity notifications updated.')} 
          />
        </Form.Item>
      </div>

      {/* Language and Theme Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">App Preferences</h3>
        <Form.Item label="Language">
          <Select 
            value={settings.language} 
            onChange={(value) => dispatch(updateSettings({ language: value }))} 
          >
            <Option value="en">English</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
            {/* Add more languages here */}
          </Select>
        </Form.Item>

        <Form.Item label="Theme">
          <Select 
            value={settings.theme} 
            onChange={(value) => dispatch(updateSettings({ theme: value }))} 
          >
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>
        </Form.Item>
      </div>

      {/* Save Settings */}
      <Button type="primary" onClick={handleSaveSettings} className="w-full mt-3">
        Save Settings
      </Button>

      {/* Account Deletion */}
      <div className="mt-6">
        <Button danger onClick={handleDeleteAccount} 
          className="w-full py-3 flex items-center justify-center h-10"
        >
          Delete Account
        </Button>
      </div>

      {/* Account Deletion Confirmation Modal */}
      <Modal
        title="Are you sure?"
        visible={showDeleteConfirmation}
        onOk={confirmDeleteAccount}
        onCancel={() => setShowDeleteConfirmation(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
      </Modal>
    </body>
  );
};

export default Settings;
