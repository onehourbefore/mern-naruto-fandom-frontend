import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import $api from '../../http';
import { PostType, OnePostState } from '../../models/PostModel';
import { CommentType } from '../../models/CommentsModel';
import { StatusModel } from '../../models/StatusModel';
import { OnePostThunks } from './thunks/OnePostThunks';

const onePostThunks = new OnePostThunks();

const initialState: OnePostState = {
    active: { post: null, status: StatusModel.IDLE },
    likeStatus: StatusModel.IDLE,
    commentStatus: StatusModel.IDLE,
};

export const fetchOnePost = createAsyncThunk(
    'fetchOnePost',
    async(id: string, { rejectWithValue }) => {
        try {
            return await onePostThunks.fetchOnePostCallback(id);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const addLike = createAsyncThunk(
    'addLike',
    async(postID: string, { rejectWithValue }) => {
        try {
            return await onePostThunks.addLikeCallback(postID);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const removeLike = createAsyncThunk(
    'removeLike',
    async(postID: string, { rejectWithValue }) => {
        try {
            return await onePostThunks.removeLikeCallback(postID);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const addComment = createAsyncThunk(
    'addComment',
    async(query: {postID: string, body: string}, { rejectWithValue }) => {
        try {
            return await onePostThunks.addCommentCallback(query);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const removeComment = createAsyncThunk(
    'removeComment', 
    async(query: { postID: string, commentID: string }, { rejectWithValue }) => {
        try {
            return await onePostThunks.removeCommentCallback(query);
        } catch(e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const onePostSlice = createSlice({
    name: 'onePost',
    initialState,
    reducers: {
        clearActivePost: (state) => {
            state.active.post = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchOnePost.pending, (state) => {
            state.active.status = StatusModel.LOADING;
        })
        .addCase(fetchOnePost.fulfilled, (state, action: PayloadAction <PostType>) => {
            state.active.post = { ...action.payload };
            state.active.status = StatusModel.SUCCESS;
        })
        .addCase(fetchOnePost.rejected, (state) => {
            state.active.status = StatusModel.ERROR;
        })


        .addCase(addLike.pending, (state) => {
            state.likeStatus = StatusModel.LOADING;
        })
        .addCase(addLike.fulfilled, (state, action: PayloadAction<number>) => {
            if(state.active.post) state.active.post.likes = action.payload;
            state.likeStatus = StatusModel.IDLE;
        })
        .addCase(addLike.rejected, (state) => {
            state.likeStatus = StatusModel.ERROR;
        })


        .addCase(removeLike.pending, (state) => {
            state.likeStatus = StatusModel.LOADING;
        })
        .addCase(removeLike.fulfilled, (state, action: PayloadAction<number>) => {
            if (state.active.post) state.active.post.likes = action.payload;
            state.likeStatus = StatusModel.IDLE;
        })
        .addCase(removeLike.rejected, (state) => {
            state.likeStatus = StatusModel.ERROR;
        })


        .addCase(addComment.pending, (state) => {
            state.commentStatus = StatusModel.LOADING;
        })
        .addCase(addComment.fulfilled, (state, action: PayloadAction <CommentType []>) => {
            if (state.active.post) state.active.post.comments = action.payload;
            state.commentStatus = StatusModel.IDLE;
        })
        .addCase(addComment.rejected, (state) => {
            state.commentStatus = StatusModel.ERROR;
        })


        .addCase(removeComment.pending, (state) => {
            state.commentStatus = StatusModel.LOADING;
        })
        .addCase(removeComment.fulfilled, (state, action: PayloadAction <{post: PostType, status: string}>) => {
            if (state.active.post) state.active.post = action.payload.post;
            state.commentStatus = StatusModel.IDLE;
        })
        .addCase(removeComment.rejected, (state) => {
            state.commentStatus = StatusModel.ERROR;
        })

        .addDefaultCase(() => {})
    }
});

const { actions, reducer } = onePostSlice;
export default reducer;
export const { clearActivePost } = actions;