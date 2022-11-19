import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationState, ResponseType } from '../../models/AuthorizationModel';
import { StatusModel } from '../../models/StatusModel';
import { AuthorizationThunks } from './thunks/AuthorizationThunks';

const authThunks = new AuthorizationThunks();

const initialState: AuthorizationState = {
    user: {
        id: '',
        email: '',
        name: '',
        role: '',
        avatar: '',
        created: 0,
        liked: []
    },
    status: StatusModel.IDLE,
    deleteProfileStatus: StatusModel.IDLE,
}

export const sendLoginForm = createAsyncThunk(
    'sendLoginForm',
    async(form: {email: string, password: string}, { rejectWithValue }) => {
        try {
            return await authThunks.sendLoginFormCallback(form);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async(_, { rejectWithValue }) => {
        try {
            return await authThunks.logoutCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const refresh = createAsyncThunk(
    'refresh',
    async(_, { rejectWithValue }) => {
        try {
            return await authThunks.refreshCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const deleteProfile = createAsyncThunk(
    'deleteProfile',
    async(_, { rejectWithValue }) => {
        try {
            return await authThunks.deleteProfileCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
        // const { data }  = await $api.get(`/deleteProfile`);
        // console.log(data);
    }
)

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase (sendLoginForm.pending, (state) => {
            state.status = StatusModel.LOADING;
        })
        .addCase (sendLoginForm.fulfilled, (state, action: PayloadAction<ResponseType>) => {
            const { accessToken, user } = action.payload;
            state.user = { ...user };
            localStorage.setItem('accessToken', accessToken);
            state.status = StatusModel.SUCCESS;
        })
        .addCase (sendLoginForm.rejected, (state) => {
            state.status = StatusModel.ERROR;
        })


        .addCase (refresh.pending, (state) => {
            state.status = StatusModel.LOADING;
        })
        .addCase (refresh.fulfilled, (state, action: PayloadAction<ResponseType>) => {
            const { accessToken, user } = action.payload;
            state.user = { ...user };
            localStorage.setItem('accessToken', accessToken);
            state.status = StatusModel.SUCCESS;
        })
        .addCase (refresh.rejected, (state) => {
            state.status = StatusModel.IDLE;
        })


        .addCase (logout.pending, (state) => {
            state.status = StatusModel.LOADING;
        })
        .addCase (logout.fulfilled, (state) => {
            state.user = {
                id: '',
                email: '',
                name: '',
                role: '',
                avatar: '',
                created: 0,
                liked: []
            }
            state.status = StatusModel.IDLE;
            localStorage.removeItem('accessToken');
        })
        .addCase (logout.rejected, (state) => {
            state.status = StatusModel.ERROR;
        })


        .addCase (deleteProfile.pending, (state) => {
            state.deleteProfileStatus = StatusModel.LOADING;
        })
        .addCase (deleteProfile.fulfilled, (state) => {
            state.user = {
                id: '',
                email: '',
                name: '',
                role: '',
                avatar: '',
                created: 0,
                liked: []
            }
            state.deleteProfileStatus = StatusModel.SUCCESS;
            localStorage.removeItem ('accessToken');
        })
        .addCase (deleteProfile.rejected, (state) => {
            state.deleteProfileStatus = StatusModel.ERROR;
        })

        .addDefaultCase (() => {})
    }
})

const { reducer } = authorizationSlice;
export default reducer;