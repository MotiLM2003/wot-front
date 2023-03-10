import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedUser: null,
	selectedCampagin: null,
};

export const selectedSwitcherSlice = createSlice({
	name: 'switcher',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.selectedUser = action.payload ? { ...action.payload } : null;
		},
		setCampagin: (state, action) => {
			state.selectedCampagin = action.payload ? { ...action.payload } : null;
		},
	},
});

export const { setUser, setCampagin } = selectedSwitcherSlice.actions;

export default selectedSwitcherSlice.reducer;
