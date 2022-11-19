import { configureStore } from '@reduxjs/toolkit';
import { StatusModel } from '../../../models/StatusModel';
import { PostsState, PostType, PostTypeForCreate } from '../../../models/PostModel';
import reducer, {
    clearAll,
    clearCreated,
    clearUpdated,
    clearDeleted,
    clearCount,
    getCountOfPosts,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
} from '../postsSlice';
import { PostsThunks } from '../thunks/PostsThunks';

const createdPost: PostTypeForCreate = {
    title: 'NARUTO',
    content: 'Hello World!',
    tags: 'one, two, three',
    image: 'narutoBg.jpg',
}

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
];

describe('postsSlice', () => {
    it('reducer (empty action, default state)', () => {
        const state = undefined;
        const action = { type: '' };
        const result = reducer(state, action);
        const defaultState: PostsState = {
            all: { posts: [], status: StatusModel.IDLE },
            created: { post: null, status: StatusModel.IDLE },
            updated: { post: null, status: StatusModel.IDLE },
            deleted: { post: null, status: StatusModel.IDLE },
            count: { count: 0, status: StatusModel.IDLE },
        }
        expect(result).toEqual(defaultState);
    });

    it('clearAll', () => {
        const state: PostsState = {
            all: { posts, status: StatusModel.SUCCESS },
            created: { post: null, status: StatusModel.IDLE },
            updated: { post: null, status: StatusModel.IDLE },
            deleted: { post: null, status: StatusModel.IDLE },
            count: { count: 0, status: StatusModel.IDLE },
        };
        const action = { type: clearAll.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.all.posts).toEqual([]);
        expect(returnedState.all.status).toBe(StatusModel.IDLE);
    });

    it('clearCreated', () => {
        const state: PostsState = {
            all: { posts: [], status: StatusModel.IDLE },
            created: { post: posts[0], status: StatusModel.SUCCESS },
            updated: { post: null, status: StatusModel.IDLE },
            deleted: { post: null, status: StatusModel.IDLE },
            count: { count: 0, status: StatusModel.IDLE },
        };
        const action = { type: clearCreated.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.created.post).toBeNull();
        expect(returnedState.created.status).toBe(StatusModel.IDLE);
    });

    it('clearUpdated', () => {
        const state: PostsState = {
            all: { posts: [], status: StatusModel.IDLE },
            created: { post: null, status: StatusModel.IDLE },
            updated: { post: posts[0], status: StatusModel.SUCCESS },
            deleted: { post: null, status: StatusModel.IDLE },
            count: { count: 0, status: StatusModel.IDLE },
        };
        const action = { type: clearUpdated.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.updated.post).toBeNull();
        expect(returnedState.updated.status).toBe(StatusModel.IDLE);
    });

    it('clearDeleted', () => {
        const state: PostsState = {
            all: { posts: [], status: StatusModel.IDLE },
            created: { post: null, status: StatusModel.IDLE },
            updated: { post: null, status: StatusModel.IDLE },
            deleted: { post: posts[0], status: StatusModel.SUCCESS },
            count: { count: 0, status: StatusModel.IDLE },
        };
        const action = { type: clearDeleted.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.deleted.post).toBeNull();
        expect(returnedState.deleted.status).toBe(StatusModel.IDLE);
    });

    it('clearCount', () => {
        const state: PostsState = {
            all: { posts: [], status: StatusModel.IDLE },
            created: { post: null, status: StatusModel.IDLE },
            updated: { post: null, status: StatusModel.IDLE },
            deleted: { post: posts[0], status: StatusModel.SUCCESS },
            count: { count: 21, status: StatusModel.SUCCESS },
        };
        const action = { type: clearCount.type, payload: undefined };
        const returnedState = reducer(state, action);
        expect(returnedState.count.count).toBe(0);
        expect(returnedState.count.status).toBe(StatusModel.IDLE);
    });
});



describe('postsSlice async actions', () => {
    it('getCountOfPosts/pending', async () => {
        const mockedGetCountOfPostsCallback = jest.spyOn(
            PostsThunks.prototype,
            'getCountOfPostsCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(getCountOfPosts());
        expect(mockedGetCountOfPostsCallback).toHaveBeenCalledTimes(1);
        expect(store.getState().count.status).toBe(StatusModel.LOADING);
    });

    it('getCountOfPosts/rejected', async () => {
        const mockedGetCountOfPostsCallback = jest.spyOn(
            PostsThunks.prototype,
            'getCountOfPostsCallback'
        );
        mockedGetCountOfPostsCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(getCountOfPosts());
        expect(mockedGetCountOfPostsCallback).toHaveBeenCalledTimes(1);
        expect(store.getState().count.status).toBe(StatusModel.ERROR);
    });

    it('getCountOfPosts/fulfilled', async () => {
        const mockedGetCountOfPostsCallback = jest.spyOn(
            PostsThunks.prototype,
            'getCountOfPostsCallback'
        );
        mockedGetCountOfPostsCallback.mockResolvedValueOnce({ postsCount: 21 });
        const store = configureStore({ reducer });
        await store.dispatch(getCountOfPosts());
        expect(mockedGetCountOfPostsCallback).toHaveBeenCalledTimes(1);
        expect(store.getState().count.status).toBe(StatusModel.SUCCESS);
        expect(store.getState().count.count).toBe(21);
    });


    it('fetchPosts/pending', async () => {
        const mockedFetchPostsCallback = jest.spyOn(
            PostsThunks.prototype,
            'fetchPostsCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(fetchPosts({limit: 2, page: 1}));
        expect(mockedFetchPostsCallback).toHaveBeenCalledTimes(1);
        expect(mockedFetchPostsCallback).toHaveBeenCalledWith({limit: 2, page: 1});
        expect(store.getState().all.status).toBe(StatusModel.LOADING);
    });

    it('fetchPosts/rejected', async () => {
        const mockedFetchPostsCallback = jest.spyOn(
            PostsThunks.prototype,
            'fetchPostsCallback'
        );
        mockedFetchPostsCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(fetchPosts({limit: 2, page: 1}));
        expect(mockedFetchPostsCallback).toHaveBeenCalledTimes(1);
        expect(mockedFetchPostsCallback).toHaveBeenCalledWith({limit: 2, page: 1});
        expect(store.getState().all.status).toBe(StatusModel.ERROR);
    });

    it('fetchPosts/fulfilled', async () => {
        const mockedFetchPostsCallback = jest.spyOn(
            PostsThunks.prototype,
            'fetchPostsCallback'
        );
        mockedFetchPostsCallback.mockResolvedValueOnce(posts);
        const store = configureStore({ reducer });
        await store.dispatch(fetchPosts({limit: 2, page: 1}));
        expect(mockedFetchPostsCallback).toHaveBeenCalledTimes(1);
        expect(mockedFetchPostsCallback).toHaveBeenCalledWith({limit: 2, page: 1});
        expect(store.getState().all.status).toBe(StatusModel.SUCCESS);
        expect(store.getState().all.posts).toEqual(posts);
    });


    it('createPost/pending', async () => {
        const mockedCreatePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'createPostCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(createPost(createdPost));
        expect(mockedCreatePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedCreatePostCallback).toHaveBeenCalledWith(createdPost);
        expect(store.getState().created.status).toBe(StatusModel.LOADING);
    });

    it('createPost/rejected', async () => {
        const mockedCreatePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'createPostCallback'
        );
        mockedCreatePostCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(createPost(createdPost));
        expect(mockedCreatePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedCreatePostCallback).toHaveBeenCalledWith(createdPost);
        expect(store.getState().created.status).toBe(StatusModel.ERROR);
    });

    it('createPost/fulfilled', async () => {
        const mockedCreatePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'createPostCallback'
        );
        mockedCreatePostCallback.mockResolvedValueOnce({message: 'success', post: posts[0]});
        const store = configureStore({ reducer });
        await store.dispatch(createPost(createdPost));
        expect(mockedCreatePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedCreatePostCallback).toHaveBeenCalledWith(createdPost);
        expect(store.getState().created.status).toBe(StatusModel.SUCCESS);
        expect(store.getState().created.post).toEqual(posts[0]);
    });


    it('updatePost/pending', async () => {
        const mockedUpdatePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'updatePostCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(updatePost({ id: 'zzzxxxccc111222', post: createdPost }));
        expect(mockedUpdatePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedUpdatePostCallback).toHaveBeenCalledWith({ id: 'zzzxxxccc111222', post: createdPost });
        expect(store.getState().updated.status).toBe(StatusModel.LOADING);
    });

    it('updatePost/rejected', async () => {
        const mockedUpdatePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'updatePostCallback'
        );
        mockedUpdatePostCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(updatePost({ id: 'zzzxxxccc111222', post: createdPost }));
        expect(mockedUpdatePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedUpdatePostCallback).toHaveBeenCalledWith({ id: 'zzzxxxccc111222', post: createdPost });
        expect(store.getState().updated.status).toBe(StatusModel.ERROR);
    });

    it('updatePost/fulfilled', async () => {
        const mockedUpdatePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'updatePostCallback'
        );
        mockedUpdatePostCallback.mockResolvedValueOnce({ message: 'success', post: posts[0] });
        const store = configureStore({ reducer });
        await store.dispatch(updatePost({ id: 'zzzxxxccc111222', post: createdPost }));
        expect(mockedUpdatePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedUpdatePostCallback).toHaveBeenCalledWith({ id: 'zzzxxxccc111222', post: createdPost });
        expect(store.getState().updated.status).toBe(StatusModel.SUCCESS);
        expect(store.getState().updated.post).toEqual(posts[0]);
    });


    it('deletePost/pending', async () => {
        const mockedDeletePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'deletePostCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(deletePost('zzzxxxccc111222'));
        expect(mockedDeletePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedDeletePostCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().deleted.status).toBe(StatusModel.LOADING);
    });

    it('deletePost/rejected', async () => {
        const mockedDeletePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'deletePostCallback'
        );
        mockedDeletePostCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(deletePost('zzzxxxccc111222'));
        expect(mockedDeletePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedDeletePostCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().deleted.status).toBe(StatusModel.ERROR);
    });

    it('deletePost/fulfilled', async () => {
        const mockedDeletePostCallback = jest.spyOn(
            PostsThunks.prototype,
            'deletePostCallback'
        );
        mockedDeletePostCallback.mockResolvedValueOnce({ message: 'success', post: posts[0] });
        const store = configureStore({ reducer });
        await store.dispatch(deletePost('zzzxxxccc111222'));
        expect(mockedDeletePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedDeletePostCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().deleted.status).toBe(StatusModel.SUCCESS);
        expect(store.getState().deleted.post).toEqual(posts[0]);
    });
});