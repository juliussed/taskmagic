// redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string | null;
  password: string;
}

const initialState: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  profilePicture: null,
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.profilePicture = action.payload.profilePicture;
      state.password = action.payload.password;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.firstName = action.payload.firstName ?? state.firstName;
      state.lastName = action.payload.lastName ?? state.lastName;
      state.email = action.payload.email ?? state.email;
      state.phone = action.payload.phone ?? state.phone;
      state.profilePicture = action.payload.profilePicture ?? state.profilePicture;
      state.password = action.payload.password ?? state.password;
    },
  },
});

export const { createUser, updateUser } = userSlice.actions;
export default userSlice.reducer;