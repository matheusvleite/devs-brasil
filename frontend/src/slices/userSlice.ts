import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/User";
import userService from "../services/userService";

interface InitialState {
    users: IUser[]
    user: IUser | null,
    error: boolean,
    success: boolean,
    loading: boolean,
    message: string
}

const initialState: InitialState = {
    users: [],
    user: null,
    error: false,
    success: false,
    loading: false,
    message: ''
};

export const profile = createAsyncThunk(
    "user/profile",
    async (_, thunkAPI: any) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await userService.profile(token);

        return data;
    }
);



export const userDetails = createAsyncThunk(
    "user/get",
    async (id: string, thunkAPI) => {
        const data = await userService.userDetails(id)

        return data
    }
)

export const updateProfile = createAsyncThunk(
    "user/update",
    async (user: FormData, thunkAPI: any) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.updateProfile(user, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const searchUser = createAsyncThunk(
    "user/search",
    async (query: string, thunkAPI) => {
        const data = await userService.searchUser(query);

        return data;
    }
)

export const getUsers = createAsyncThunk(
    "user/users",
    async () => {
        const data = await userService.getUsers();

        return data;
    }
)

export const starAnUser = createAsyncThunk(
    "user/star",
    async (id: string, thunkAPI: any) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.starAnUser(id, token);

        if (data.code) {
            return thunkAPI.rejectWithValue(data.response.data.errors[0])
        }

        return data;
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
            }).addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.user = action.payload;
                state.message = "Usuário atualizado com sucesso!"
            }).addCase(updateProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            }).addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.user = action.payload;
            }).addCase(searchUser.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(searchUser.fulfilled, (state, action: PayloadAction<IUser[], string>) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.users = action.payload;
            }).addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.users = action.payload;
            }).addCase(starAnUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                if(state.user?.stars) {
                    state.user.stars.push(action.payload.userId)
                }

                state.users.map(user => {
                    if (user._id === action.payload.user) {
                        return user.stars.push(action.payload.userId)
                    }
                    return user;
                })
            }).addCase(starAnUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            })
    }
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;