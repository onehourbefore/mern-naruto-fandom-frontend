import reducer, { clearComments, commentSlice, fetchComments } from '../commentSlice';
import { StatusModel } from '../../../models/StatusModel';
import { CommentsState, CommentType } from '../../../models/CommentsModel';
import { configureStore } from '@reduxjs/toolkit';
import { CommentsThunks } from '../thunks/CommentsThunks';

const comments: CommentType[] = [
    {
        _id: 'czczc12121',
        postID: 'qqqwwweee1111222',
        date: String(new Date()),
        name: 'Jake',
        email: 'jake@gmail.com',
        body: 'Hello world!',
        avatar: 'jakeAvatar.jpg',
    },
    {
        _id: 'cbhbhbhy8yy',
        postID: 'iv9dfiv9fd',
        date: String(new Date()),
        name: 'Rob',
        email: 'rob@gmail.com',
        body: 'Welcome!',
        avatar: 'robAvatar.jpg',
    }
]

describe('commentsSlice', () => {
    it('reducer (empty action, default state)', () => {
        const state = undefined;
        const action = { type: '' };
        const defaultState: CommentsState = {
            comments: [],
            status : StatusModel.IDLE,
        }
        expect(reducer(state, action)).toEqual(defaultState);
    });

    it('clearComments', () => {
        const state: CommentsState = {
            comments,
            status : StatusModel.SUCCESS,
        }
        const action = { type: clearComments.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.comments).toEqual([]);
    });
});


describe('commentSlice async actions', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('fetchComments/pending', async () => {
		const mockedFetchCommentsCallback = jest.spyOn(
			CommentsThunks.prototype,
			'fetchCommentsCallback'
		);
		const store = configureStore({ reducer: commentSlice.reducer });
		store.dispatch(fetchComments());
		expect(mockedFetchCommentsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().comments).toEqual([]);
		expect(store.getState().status).toBe(StatusModel.LOADING);
	});

    it('fetchComments/rejected', async () => {
		const mockedFetchCommentsCallback = jest.spyOn(
			CommentsThunks.prototype,
			'fetchCommentsCallback'
		);
        mockedFetchCommentsCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer: commentSlice.reducer });
		await store.dispatch(fetchComments());
		expect(mockedFetchCommentsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().comments).toEqual([]);
		expect(store.getState().status).toBe(StatusModel.ERROR);
	});

    it('fetchComments/fulfilled', async () => {
		const mockedFetchCommentsCallback = jest.spyOn(
			CommentsThunks.prototype,
			'fetchCommentsCallback'
		);
        mockedFetchCommentsCallback.mockResolvedValueOnce(comments);
		const store = configureStore({ reducer: commentSlice.reducer });
		await store.dispatch(fetchComments());
		expect(mockedFetchCommentsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().comments).toEqual(comments);
		expect(store.getState().status).toBe(StatusModel.SUCCESS);
	});
});