import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../http';
import { PostType } from '../../models/PostModel';
import { FilterState } from '../../models/FilterModel';
import { StatusModel } from '../../models/StatusModel';
import { FilterThunks } from './thunks/FilterThunks';

const filterThunks = new FilterThunks();

const initialState: FilterState = {
    list: [],
    tags: [],
    fetchStatus: StatusModel.IDLE,
    searchStatus: StatusModel.IDLE,
}

export const findPosts = createAsyncThunk(
    'searchPost',
    async(q: {type: '_query' | '_tag', payload: string}, { rejectWithValue }) => {
        try {
            return await filterThunks.findPostsCallback(q);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const getAllTags = createAsyncThunk(
    'getAllTags',
    async(_, { rejectWithValue }) => {
        try {
            return await filterThunks.getAllTagsCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        clearFiltered: (state) => {
            state.list = [];
        },
        clearAllTags: (state) => {
            state.tags = [];
        },
        clearSearchStatus: (state) => {
            state.searchStatus = StatusModel.IDLE;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(findPosts.pending, (state) => {
            state.searchStatus = StatusModel.LOADING;
        })
        .addCase(findPosts.fulfilled, (state, action: PayloadAction <PostType[]>) => {
            if (action.payload.length !== 0) {
                state.list = action.payload;
                state.searchStatus = StatusModel.SUCCESS;
            } else {
                state.searchStatus = StatusModel.ERROR;
            }
        })
        .addCase(findPosts.rejected, (state) => {
            state.searchStatus = StatusModel.ERROR;
        })


        .addCase(getAllTags.pending, (state) => {
            state.fetchStatus = StatusModel.LOADING;
        })
        .addCase(getAllTags.fulfilled, (state, action: PayloadAction <string []>) => {
            state.tags = action.payload;
            state.fetchStatus = StatusModel.SUCCESS;
        })
        .addCase(getAllTags.rejected, (state) => {
            state.fetchStatus = StatusModel.ERROR;
        })

        .addDefaultCase(() => {})
    }
})

const { actions, reducer } = filterSlice;
export default reducer;
export const { clearFiltered, clearAllTags, clearSearchStatus } = actions;