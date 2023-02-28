import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { ILogin, IRegisterUser } from '../interfaces/User';
import authService from '../services/authService';

const userAuth = JSON.parse(localStorage.getItem("user")!);

interface InitialState {
    user: IRegisterUser | null,
    error: boolean
    success: boolean,
    loading: boolean,
    message: string
}

const initialState: InitialState = {
    user: userAuth ? userAuth : null,
    error: false,
    success: false,
    loading: false,
    message: ''
};

// Register an user and sign in

export const register = createAsyncThunk("auth/register",
    async (user: IRegisterUser, thunkAPI) => {
        const data = await authService.register(user)

        // check for errors
        if (data.code) {
            return thunkAPI.rejectWithValue(data.response.data.errors[0])
        }

        return data;
    }
);

// Login an user

export const login = createAsyncThunk("auth/login", 
    async(user: ILogin, thunkAPI) => {
        const data = await authService.login(user)

        if(data.code) {
            return thunkAPI.rejectWithValue(data.response.data.errors[0])
        }

        return data;
    }


);

// Logout an user

export const logout = createAsyncThunk("auth/logout", () => {
    authService.logout()
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state: InitialState) => {
            state.loading = true;
            state.error = false;
        }).addCase(register.fulfilled, (state: InitialState, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.user = null;
        }).addCase(login.pending, (state: InitialState) => {
            state.loading = true;
            state.error = false;
        }).addCase(login.fulfilled, (state: InitialState, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
        }).addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.user = null;
        }).addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = null;
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;