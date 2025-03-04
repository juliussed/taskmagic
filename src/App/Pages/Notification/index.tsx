import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { markAsRead, deleteNotification } from '../../../Redux/notificationSlice';
import { useEffect } from 'react';

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const theme = useSelector((state: RootState) => state.settings.theme); // Get theme from Redux state

  // Apply theme on component mount or theme change
  useEffect(() => {
    // Apply the theme class to the body tag
    document.body.className = theme; // Will apply 'light' or 'dark' class to body
  }, [theme]);

  return (
    <body className="w-[70%] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`p-4 mb-2 rounded-md flex justify-between items-center ${notification.read ? 'bg-gray-200' : 'bg-blue-50'}`}
            >
              <span>{notification.message}</span>
              
              <div className="flex items-center space-x-4">
                {/* Mark as Read Button */}
                {!notification.read && (
                  <button 
                    onClick={() => dispatch(markAsRead(notification.id))}
                    className=" px-2 py-1 rounded hover:text-blue-500"
                  >
                    Mark as Read
                  </button>
                )}
                
                {/* Delete Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent marking as read
                    dispatch(deleteNotification(notification.id));
                  }}
                  className=" text-red-500 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </body>
  );
}
