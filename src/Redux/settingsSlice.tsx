import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  emailNotifications: boolean;
  language: string;
  theme: string;
  twoFactorEnabled: boolean;
  securityQuestion: string;
  securityAnswer: string;
  marketingNotifications: boolean;
  activityNotifications: boolean;
}

const initialState: SettingsState = {
  emailNotifications: true,
  language: 'en',
  theme: 'light',
  twoFactorEnabled: false,
  securityQuestion: '',
  securityAnswer: '',
  marketingNotifications: true,
  activityNotifications: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
    toggleEmailNotifications: (state) => {
      state.emailNotifications = !state.emailNotifications;
    },
    toggleTwoFactorAuthentication: (state) => {
      state.twoFactorEnabled = !state.twoFactorEnabled;
    },
    toggleMarketingNotifications: (state) => {
      state.marketingNotifications = !state.marketingNotifications;
    },
    toggleActivityNotifications: (state) => {
      state.activityNotifications = !state.activityNotifications;
    },
  },
});

export const {
  updateSettings,
  toggleEmailNotifications,
  toggleTwoFactorAuthentication,
  toggleMarketingNotifications,
  toggleActivityNotifications,
} = settingsSlice.actions;

export default settingsSlice.reducer;
