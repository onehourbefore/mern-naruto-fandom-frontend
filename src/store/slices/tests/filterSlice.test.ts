import { configureStore } from '@reduxjs/toolkit';
import reducer, { clearFiltered, clearAllTags, clearSearchStatus, findPosts, getAllTags } from '../filterSlice';
import { StatusModel } from '../../../models/StatusModel';
import { FilterState } from '../../../models/FilterModel';
import { PostType } from '../../../models/PostModel';
import { FilterThunks } from '../thunks/FilterThunks';


const posts: PostType[] = [
    {
        _id: 'jqwicjqiw',
        author: 'Jake',
        title: 'ANIME',
        content: 'Hello World!',
        tags: ['anime', 'naruto'],
        likes: 12,
        comments: [],
        views: 89,
        image: 'bg1.jpg',
    },
    {
        _id: 'kvokdfovkdf',
        author: 'Rob',
        title: 'NARUTO',
        content: 'Welcome!',
        tags: ['uzumaki', 'naruto'],
        likes: 9,
        comments: [],
        views: 45,
        image: 'bg2.jpg',
    }
]

describe('filterSlice', () => {
    it('reducer (empty action, default state)', () => {
        const state = undefined;
        const action = { type: '' };
        const result = reducer(state, action);
        const defaultState: FilterState = {
            list: [],
            tags: [],
            fetchStatus: StatusModel.IDLE,
            searchStatus: StatusModel.IDLE,
        }
        expect(result).toEqual(defaultState);
    });


    it('clearFiltered', () => {
        const state: FilterState = {
            list: posts,
            tags: [],
            fetchStatus: StatusModel.IDLE,
            searchStatus: StatusModel.IDLE,
        }
        const action = { type: clearFiltered.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.list).toEqual([]);
    });

    it('clearAllTags', () => {
        const state: FilterState = {
            list: [],
            tags: ['one', 'two', 'three'],
            fetchStatus: StatusModel.IDLE,
            searchStatus: StatusModel.IDLE,
        }
        const action = { type: clearAllTags.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.tags).toEqual([]);
    });

    it('clearSearchStatus', () => {
        const state: FilterState = {
            list: [],
            tags: [],
            fetchStatus: StatusModel.IDLE,
            searchStatus: StatusModel.SUCCESS,
        }
        const action = { type: clearSearchStatus.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.searchStatus).toBe(StatusModel.IDLE);
    });
});


describe('filterSlice async actions', () => {
    it('findPosts/pending', async () => {
		const mockedFindPostsCallback = jest.spyOn(
			FilterThunks.prototype,
			'findPostsCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(findPosts({ type: '_query', payload: 'naruto' }));
		expect(mockedFindPostsCallback).toHaveBeenCalledTimes(1);
        expect(mockedFindPostsCallback).toHaveBeenCalledWith({ type: '_query', payload: 'naruto' });
		expect(store.getState().list).toEqual([]);
		expect(store.getState().searchStatus).toBe(StatusModel.LOADING);
	});

    it('findPosts/rejected', async () => {
		const mockedFindPostsCallback = jest.spyOn(
			FilterThunks.prototype,
			'findPostsCallback'
		);
        mockedFindPostsCallback.mockRejectedValueOnce([]);
		const store = configureStore({ reducer });
		await store.dispatch(findPosts({ type: '_query', payload: 'naruto' }));
		expect(mockedFindPostsCallback).toHaveBeenCalledTimes(1);
        expect(mockedFindPostsCallback).toHaveBeenCalledWith({ type: '_query', payload: 'naruto' });
		expect(store.getState().list).toEqual([]);
		expect(store.getState().searchStatus).toBe(StatusModel.ERROR);
	});

    it('findPosts/fulfilled', async () => {
		const mockedFindPostsCallback = jest.spyOn(
			FilterThunks.prototype,
			'findPostsCallback'
		);
        mockedFindPostsCallback.mockResolvedValueOnce(posts);
		const store = configureStore({ reducer });
		await store.dispatch(findPosts({ type: '_query', payload: 'naruto' }));
		expect(mockedFindPostsCallback).toHaveBeenCalledTimes(1);
        expect(mockedFindPostsCallback).toHaveBeenCalledWith({ type: '_query', payload: 'naruto' });
		expect(store.getState().list).toEqual(posts);
		expect(store.getState().searchStatus).toBe(StatusModel.SUCCESS);
	});


    it('getAllTags/pending', async () => {
		const mockedGetAllTagsCallback = jest.spyOn(
			FilterThunks.prototype,
			'getAllTagsCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(getAllTags());
		expect(mockedGetAllTagsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().tags).toEqual([]);
		expect(store.getState().fetchStatus).toBe(StatusModel.LOADING);
	});

    it('getAllTags/rejected', async () => {
		const mockedGetAllTagsCallback = jest.spyOn(
			FilterThunks.prototype,
			'getAllTagsCallback'
		);
        mockedGetAllTagsCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer });
		await store.dispatch(getAllTags());
		expect(mockedGetAllTagsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().tags).toEqual([]);
		expect(store.getState().fetchStatus).toBe(StatusModel.ERROR);
	});

    it('getAllTags/fulfilled', async () => {
		const mockedGetAllTagsCallback = jest.spyOn(
			FilterThunks.prototype,
			'getAllTagsCallback'
		);
        mockedGetAllTagsCallback.mockResolvedValueOnce(['one', 'two', 'three']);
		const store = configureStore({ reducer });
		await store.dispatch(getAllTags());
		expect(mockedGetAllTagsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().tags).toEqual(['one', 'two', 'three']);
		expect(store.getState().fetchStatus).toBe(StatusModel.SUCCESS);
	});
});
