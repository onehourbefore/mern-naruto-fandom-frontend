import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../http';
import { CommentsThunks } from './thunks/CommentsThunks';
import { CommentType, CommentsState } from '../../models/CommentsModel';
import { StatusModel } from '../../models/StatusModel';

const commentsThunks = new CommentsThunks();

const initialState: CommentsState = {
    comments: [],
    status : StatusModel.IDLE,
}

export const fetchComments = createAsyncThunk(
    'fetchComments',
    async(_, { rejectWithValue }) => {
        try {
            return await commentsThunks.fetchCommentsCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = [];
        }
    },
    extraReducers: builder => {
        builder
        .addCase (fetchComments.pending, (state) => {
            state.status = StatusModel.LOADING;
        })
        .addCase (fetchComments.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
            state.comments = action.payload;
            state.status = StatusModel.SUCCESS;
        })
        .addCase (fetchComments.rejected, (state) => {
            state.status = StatusModel.ERROR;
        })
        
        .addDefaultCase (() => {})
    }
})

const { actions, reducer } = commentSlice;
export default reducer;
export const { clearComments } = actions;