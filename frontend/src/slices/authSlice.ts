import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../interfaces/User';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem("user")!);

interface InitialState {
    user: User,
    error: string,
    success: boolean,
    loading: boolean
}

const initialState: InitialState = {
    user: user ? user : null,
    error: '',
    success: false,
    loading: false
};

// Register an user and sign in

export const register = createAsyncThunk("auth/register",
    async (user: User, thunkAPI) => {
        const data = await authService.register(user)

        // check for errors

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
);


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = '';
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = ''
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = '';
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Algo deu errado';
            state.user = user;
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;