import { configureStore } from "@reduxjs/toolkit";
 // Ensure counterSlice has TypeScript support
import taskReducer from "./taskSlice"; // Import taskSlice
import userReducer from './UserSlice'
import settingsReducer from './settingsSlice'
import notificationsReducer from './notificationSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user:userReducer,
    settings:settingsReducer,
    notifications: notificationsReducer, // Add taskReducer to the store
  },
});

// Export RootState & AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
