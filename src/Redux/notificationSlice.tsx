import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique ids

// Define the structure of a single notification
interface Notification {
  id: string;  // Use UUID as a string for id
  message: string;
  read: boolean; // Read/unread status
}

// Define the structure of the slice state
interface NotificationState {
  notifications: Notification[];
}

// Initial state of the notifications slice
const initialState: NotificationState = {
  notifications: [],
};

// Create the slice with reducers for adding, deleting, and marking notifications as read
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Add a new notification to the state
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const newNotification: Notification = {
        id: uuidv4(),  // Generate a unique id for each notification
        message: action.payload.message,
        read: action.payload.read,
      };
      state.notifications.push(newNotification);
    },
    // Delete a notification by index
    deleteNotification: (state, action: PayloadAction<string>) => {
      // Delete notification based on its id
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    // Mark a notification as read
    markAsRead: (state, action: PayloadAction<string>) => {
      // Find the notification by id and mark it as read
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.read = true; // Mark as read
      }
    },
  },
});

// Export the actions to be used in components
export const { addNotification, deleteNotification, markAsRead } = notificationSlice.actions;

// Export the reducer to be used in the store
export default notificationSlice.reducer;
