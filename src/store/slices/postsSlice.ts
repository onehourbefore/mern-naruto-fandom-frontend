import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PostsState, PostType, PostTypeForCreate } from '../../models/PostModel';
import { StatusModel } from '../../models/StatusModel';
import { PostsThunks } from './thunks/PostsThunks';

const postsThunks = new PostsThunks();

const initialState: PostsState = {
    all: { posts: [], status: StatusModel.IDLE },
    created: { post: null, status: StatusModel.IDLE },
    updated: { post: null, status: StatusModel.IDLE },
    deleted: { post: null, status: StatusModel.IDLE },
    count: { count: 0, status: StatusModel.IDLE },
}

export const getCountOfPosts = createAsyncThunk(
    'countOfPosts',
    async(_, { rejectWithValue }) => {
        try {
            return await postsThunks.getCountOfPostsCallback();
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const fetchPosts = createAsyncThunk(
    'fetchPosts',
    async (query: {limit: number, page: number}, { rejectWithValue }) => {
        try {
            return await postsThunks.fetchPostsCallback(query);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const createPost = createAsyncThunk(
    'createPost',
    async(post: PostTypeForCreate, { rejectWithValue }) => {
        try {
            return await postsThunks.createPostCallback(post);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async(query: {id: string, post: PostTypeForCreate}, { rejectWithValue }) => {
        try {
            return await postsThunks.updatePostCallback(query);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async(id: string, { rejectWithValue }) => {
        try {
            return await postsThunks.deletePostCallback(id);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
)


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearAll: (state) => {
            state.all.posts = [];
            state.all.status = StatusModel.IDLE;
        },
        clearCreated: (state) => {
            state.created.post = null;
            state.created.status = StatusModel.IDLE;
        },
        clearUpdated: (state) => {
            state.updated.post = null;
            state.updated.status = StatusModel.IDLE;
        },
        clearDeleted: (state) => {
            state.deleted.post = null;
            state.deleted.status = StatusModel.IDLE;
        },
        clearCount: (state) => {
            state.count.count = 0;
            state.count.status = StatusModel.IDLE;
        }
    },
    extraReducers: builder => {
        builder
        .addCase (getCountOfPosts.pending, (state) => {
            state.count.status = StatusModel.LOADING;
        })
        .addCase (getCountOfPosts.fulfilled, (
            state,
            action: PayloadAction <{postsCount: number}>
        ) => {
            state.count.count = action.payload.postsCount;
            state.count.status = StatusModel.SUCCESS;
        })
        .addCase (getCountOfPosts.rejected, (state) => {
            state.count.status = StatusModel.ERROR;
        })


        .addCase (fetchPosts.pending, (state) => {
            state.all.status = StatusModel.LOADING;
        })
        .addCase (fetchPosts.fulfilled, (
            state,
            action: PayloadAction <PostType []>
        ) => {
            state.all.posts = [...state.all.posts, ...action.payload];
            state.all.status = StatusModel.SUCCESS;
        })
        .addCase (fetchPosts.rejected, (state) => {
            state.all.status = StatusModel.ERROR;
        })


        .addCase (createPost.pending, (state) => {
            state.created.status = StatusModel.LOADING;
        })
        .addCase (createPost.fulfilled, (
            state,
            action: PayloadAction <{message: string, post: PostType}>
        ) => {
            state.created.post = action.payload.post;
            state.created.status = StatusModel.SUCCESS;
        })
        .addCase (createPost.rejected, (state) => {
            state.created.status = StatusModel.ERROR;
        })


        .addCase (updatePost.pending, (state) => {
            state.updated.status = StatusModel.LOADING;
        })
        .addCase (updatePost.fulfilled, (
            state,
            action: PayloadAction <{message: string, post: PostType}>
        ) => {
            state.updated.post = action.payload.post;
            state.updated.status = StatusModel.SUCCESS;
        })
        .addCase (updatePost.rejected, (state) => {
            state.updated.status = StatusModel.ERROR;
        })


        .addCase (deletePost.pending, (state) => {
            state.deleted.status = StatusModel.LOADING;
        })
        .addCase (deletePost.fulfilled, (
            state,
            action: PayloadAction <{message: string, post: PostType}>
        ) => {
            state.deleted.post = action.payload.post;
            state.deleted.status = StatusModel.SUCCESS;
        })
        .addCase (deletePost.rejected, (state) => {
            state.deleted.status = StatusModel.ERROR;
        })

        .addDefaultCase (() => {})
    }
})

const { actions, reducer } = postsSlice;
export default reducer;
export const { clearAll, clearCreated, clearUpdated, clearDeleted, clearCount } = actions;