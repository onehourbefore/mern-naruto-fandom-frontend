import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ExpertsState, ExpertType } from '../../models/ExpertsModel';
import { StatusModel } from '../../models/StatusModel';
import { ExpertsThunks } from './thunks/ExpertsThunks';

const expertsThunks = new ExpertsThunks();

const initialState: ExpertsState = {
    experts: [],
    status: StatusModel.IDLE,
};

export const fetchExperts = createAsyncThunk(
    'fetchExperts',
    async(_, { rejectWithValue }) => {
        try {
            return await expertsThunks.fetchExpertsCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const expertSlice = createSlice ({
    name: 'experts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchExperts.pending, (state) => {
            state.status = StatusModel.LOADING;
        })
        .addCase(fetchExperts.fulfilled, (state, action: PayloadAction<ExpertType [] | []>) => {
            state.experts = action.payload;
            state.status = StatusModel.SUCCESS;
        })
        .addCase(fetchExperts.rejected, (state) => {
            state.status = StatusModel.ERROR;
        })

        .addDefaultCase(() => {})
    }
});

const { reducer } = expertSlice;
export default reducer;