import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { IRegisterUser } from '../interfaces/User';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem("user")!);

interface InitialState {
    user: IRegisterUser | null,
    error: boolean
    success: boolean,
    loading: boolean,
    message: {}
}

const initialState: InitialState = {
    user: user,
    error: false,
    success: false,
    loading: false,
    message: {}
};

// Register an user and sign in

export const register = createAsyncThunk("auth/register",
    async (user: IRegisterUser, thunkAPI) => {
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
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state: InitialState) => {
            state.loading = true;
        }).addCase(register.fulfilled, (state: InitialState, action: PayloadAction<IRegisterUser>) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.user = null;
        })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;