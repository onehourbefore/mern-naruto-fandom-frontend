import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http';
import { StatusModel } from '../../models/StatusModel';
import { RegistrationFormType, RegistrationState } from '../../models/RegistrationModel';
import { RegistrationThunks } from './thunks/RegistrationThunks';

const regThunks = new RegistrationThunks();


const initialState: RegistrationState = {
    status: StatusModel.IDLE,
}

export const sendRegistrationForm = createAsyncThunk(
    'sendRegistrationForm',
    async(form: RegistrationFormType, { rejectWithValue }) => {
        try {
            await regThunks.sendRegistrationFormCallback(form);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const registrationSlice = createSlice ({
    name: 'registration',
    initialState, 
    reducers: {},
    extraReducers: builder => 
        builder
        .addCase(sendRegistrationForm.pending, state => {
            state.status = StatusModel.LOADING;
        })
        .addCase(sendRegistrationForm.fulfilled, state => {
            state.status = StatusModel.SUCCESS;
        })
        .addCase(sendRegistrationForm.rejected, state => {
            state.status = StatusModel.ERROR;
        })
        .addDefaultCase (() => {})
})

const { reducer } = registrationSlice;
export default reducer;