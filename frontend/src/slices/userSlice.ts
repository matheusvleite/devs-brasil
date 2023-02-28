import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { IUser } from "../interfaces/User";
import userService from "../services/userService";

interface InitialState {
    user: IUser | null,
    error: boolean,
    success: boolean,
    loading: boolean,
    message: string
}

const initialState: InitialState = {
    user: null,
    error: false,
    success: false,
    loading: false,
    message: ''
};



export const userDetails = createAsyncThunk(
    "user/get",
    async (id: string, thunkAPI) => {
        const data = await userService.userDetails(id)

        return data
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(userDetails.pending, (state) => {
            state.loading = true;
            state.error = false
        }).addCase(userDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
        })
    }
});

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;