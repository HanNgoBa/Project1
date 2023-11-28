import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import {
    loginUserThunk,
    registerUserThunk,
    updateUserThunk,
} from './userThunk';



const initialState = {
//   isLoading: false,
//   user: null
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
    // console.log(`Register User : ${JSON.stringify(user)}`)
    return registerUserThunk('/auth/register', user, thunkAPI);
});

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkAPI) => {
        return updateUserThunk('/auth/updateUser', user, thunkAPI);
    }
);

export const loginUser = createAsyncThunk('user/loginUser',async (user, thunkAPI) => {
    // console.log(`Login User : ${JSON.stringify(user)}`)
    return loginUserThunk('/auth/login', user, thunkAPI);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers:{
    //update profile
    [updateUser.pending]: (state) => {
        state.isLoading = true;
      },
      [updateUser.fulfilled]: (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
  
        addUserToLocalStorage(user);
        toast.success('User Updated');
      },
      [updateUser.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
    },
    //register
    [registerUser.pending]: (state) => {
        state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
    },
    //login user
    [loginUser.pending]: (state) => {
        state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
    },
  },
  reducers: {
    logoutUser: (state, {payload}) => {
        state.user = null;
        state.isSidebarOpen = false;
        // toast.success('Logout Successful!');
        removeUserFromLocalStorage();
        if(payload){
            toast.success(payload)
        }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  }
});

export const { logoutUser, toggleSidebar } = userSlice.actions;

export default userSlice.reducer;