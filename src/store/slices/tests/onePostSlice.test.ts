import { configureStore } from '@reduxjs/toolkit';
import reducer, { clearActivePost, fetchOnePost, addLike, removeLike, addComment, removeComment } from '../onePostSlice';
import { StatusModel } from '../../../models/StatusModel';
import { OnePostState, PostType } from '../../../models/PostModel';
import { CommentType } from '../../../models/CommentsModel';
import { OnePostThunks } from '../thunks/OnePostThunks';


const post: PostType = {
    _id: 'aaabbb1122',
    author: 'Jake',
    title: 'Hello World',
    content: 'Helo hello hello Helo hello hello Helo hello hello',
    tags: ['hello', 'world', '!!!'],
    likes: 23,
    comments: [],
    views: 123,
    image: 'zzzxxxccc11122333.jpg'
}

const comment: CommentType = {
    _id: 'koker9fe9rkf9erf',
    postID: 'zzzxxxccc111222',
    date: String(new Date()),
    name: 'Jake',
    email: 'jake@gmail.com',
    body: 'Welcome!',
    avatar: 'jakeAvatar.jpg',
}

describe('onePostSlice', () => {
    it('reducer (empty action, default state)', () => {
        const state = undefined;
        const action = { type: '' };
        const result = reducer(state, action);
        const defaultState: OnePostState = {
            active: { post: null, status: StatusModel.IDLE },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE
        }
        expect(result).toEqual(defaultState);
    });

    it('clearActivePost', () => {
        const state: OnePostState = {
            active: { 
                post,
                status: StatusModel.SUCCESS
            },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE
        };
        const action = { type: clearActivePost.type, payload: undefined };
        const result = reducer(state, action);
        expect(result.active.post).toBeNull();
    });
});


describe('onePostSlice async actions', () => {
    it('fetchOnePost/pending', async() => {
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(fetchOnePost('zzzxxxccc111222'));
        expect(mockedFetchOnePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedFetchOnePostCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().active.status).toBe(StatusModel.LOADING);
    });

    it('fetchOnePost/rejected', async() => {
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        );
        mockedFetchOnePostCallback.mockRejectedValueOnce({ message: 'Error' })
        const store = configureStore({ reducer });
        await store.dispatch(fetchOnePost('zzzxxxccc111222'));
        expect(mockedFetchOnePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedFetchOnePostCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().active.status).toBe(StatusModel.ERROR);
    });

    it('fetchOnePost/fulfilled', async() => {
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        );
        mockedFetchOnePostCallback.mockResolvedValueOnce(post);
        const store = configureStore({ reducer });
        await store.dispatch(fetchOnePost('zzzxxxccc111222'));
        expect(mockedFetchOnePostCallback).toHaveBeenCalledTimes(1);
        expect(mockedFetchOnePostCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().active.status).toBe(StatusModel.SUCCESS);
        expect(store.getState().active.post).toEqual(post);
    });


    it('addLike/pending', async() => {
        const mockedAddLikeCallback = jest.spyOn(
            OnePostThunks.prototype,
            'addLikeCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(addLike('zzzxxxccc111222'));
        expect(mockedAddLikeCallback).toHaveBeenCalledTimes(1);
        expect(mockedAddLikeCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().likeStatus).toBe(StatusModel.LOADING);
    });

    it('addLike/rejected', async() => {
        const mockedAddLikeCallback = jest.spyOn(
            OnePostThunks.prototype,
            'addLikeCallback'
        );
        mockedAddLikeCallback.mockRejectedValueOnce({ message: 'Error' })
        const store = configureStore({ reducer });
        await store.dispatch(addLike('zzzxxxccc111222'));
        expect(mockedAddLikeCallback).toHaveBeenCalledTimes(1);
        expect(mockedAddLikeCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().likeStatus).toBe(StatusModel.ERROR);
    });

    it('addLike/fulfilled', async() => {
        const mockedAddLikeCallback = jest.spyOn(
            OnePostThunks.prototype,
            'addLikeCallback'
        );
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        );
        mockedFetchOnePostCallback.mockResolvedValueOnce(post);
        mockedAddLikeCallback.mockResolvedValueOnce(32)
        const store = configureStore({ reducer });
        await store.dispatch(fetchOnePost('zzzxxxccc111222'));
        await store.dispatch(addLike('zzzxxxccc111222'));
        expect(mockedAddLikeCallback).toHaveBeenCalledTimes(1);
        expect(mockedAddLikeCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().likeStatus).toBe(StatusModel.IDLE);
        expect(store.getState().active.post?.likes).toBe(32);
    });


    it('removeLike/pending', async() => {
        const mockedRemoveLikeCallback = jest.spyOn(
            OnePostThunks.prototype,
            'removeLikeCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(removeLike('zzzxxxccc111222'));
        expect(mockedRemoveLikeCallback).toHaveBeenCalledTimes(1);
        expect(mockedRemoveLikeCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().likeStatus).toBe(StatusModel.LOADING);
    });

    it('removeLike/rejected', async() => {
        const mockedRemoveLikeCallback = jest.spyOn(
            OnePostThunks.prototype,
            'removeLikeCallback'
        );
        mockedRemoveLikeCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(removeLike('zzzxxxccc111222'));
        expect(mockedRemoveLikeCallback).toHaveBeenCalledTimes(1);
        expect(mockedRemoveLikeCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().likeStatus).toBe(StatusModel.ERROR);
    });

    it('removeLike/fulfilled', async() => {
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        )
        const mockedRemoveLikeCallback = jest.spyOn(
            OnePostThunks.prototype,
            'removeLikeCallback'
        );
        mockedFetchOnePostCallback.mockResolvedValueOnce(post);
        mockedRemoveLikeCallback.mockResolvedValueOnce(31);
        const store = configureStore({ reducer });
        await store.dispatch(fetchOnePost('zzzxxxccc111222'));
        await store.dispatch(removeLike('zzzxxxccc111222'));
        expect(mockedRemoveLikeCallback).toHaveBeenCalledTimes(1);
        expect(mockedRemoveLikeCallback).toHaveBeenCalledWith('zzzxxxccc111222');
        expect(store.getState().likeStatus).toBe(StatusModel.IDLE);
        expect(store.getState().active.post?.likes).toBe(31);
    });


    it('addComment/pending', async() => {
        const mockedAddCommentCallback = jest.spyOn(
            OnePostThunks.prototype,
            'addCommentCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(addComment({postID: 'zzzxxxccc111222', body: 'Welcome!'}));
        expect(mockedAddCommentCallback).toHaveBeenCalledTimes(1);
        expect(mockedAddCommentCallback).toHaveBeenCalledWith({postID: 'zzzxxxccc111222', body: 'Welcome!'});
        expect(store.getState().commentStatus).toBe(StatusModel.LOADING);
    });

    it('addComment/rejected', async() => {
        const mockedAddCommentCallback = jest.spyOn(
            OnePostThunks.prototype,
            'addCommentCallback'
        );
        mockedAddCommentCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(addComment({postID: 'zzzxxxccc111222', body: 'Welcome!'}));
        expect(mockedAddCommentCallback).toHaveBeenCalledTimes(1);
        expect(mockedAddCommentCallback).toHaveBeenCalledWith({postID: 'zzzxxxccc111222', body: 'Welcome!'});
        expect(store.getState().commentStatus).toBe(StatusModel.ERROR);
    });

    it('addComment/fulfilled', async() => {
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        );
        const mockedAddCommentCallback = jest.spyOn(
            OnePostThunks.prototype,
            'addCommentCallback'
        );
        mockedFetchOnePostCallback.mockResolvedValue(post);
        mockedAddCommentCallback.mockResolvedValueOnce([comment]);
        const store = configureStore({ reducer });
        await store.dispatch(fetchOnePost('zzzxxxccc111222'));
        await store.dispatch(addComment({postID: 'zzzxxxccc111222', body: 'Welcome!'}));
        expect(mockedAddCommentCallback).toHaveBeenCalledTimes(1);
        expect(mockedAddCommentCallback).toHaveBeenCalledWith({postID: 'zzzxxxccc111222', body: 'Welcome!'});
        expect(store.getState().commentStatus).toBe(StatusModel.IDLE);
        expect(store.getState().active.post?.comments).toEqual([comment]);
    });


    it('removeComment/pending', async() => {
        const mockedRemoveCommentCallback = jest.spyOn(
            OnePostThunks.prototype,
            'removeCommentCallback'
        );
        const store = configureStore({ reducer });
        store.dispatch(removeComment({ postID: 'zzzxxxccc111222', commentID: '9sid9csd9cis9dic' }));
        expect(mockedRemoveCommentCallback).toHaveBeenCalledTimes(1);
        expect(mockedRemoveCommentCallback).toHaveBeenCalledWith({ postID: 'zzzxxxccc111222', commentID: '9sid9csd9cis9dic' });
        expect(store.getState().commentStatus).toBe(StatusModel.LOADING);
    });

    it('removeComment/rejected', async() => {
        const mockedRemoveCommentCallback = jest.spyOn(
            OnePostThunks.prototype,
            'removeCommentCallback'
        );
        mockedRemoveCommentCallback.mockRejectedValueOnce({ message: 'Error' });
        const store = configureStore({ reducer });
        await store.dispatch(removeComment({ postID: 'zzzxxxccc111222', commentID: '9sid9csd9cis9dic' }));
        expect(mockedRemoveCommentCallback).toHaveBeenCalledTimes(1);
        expect(mockedRemoveCommentCallback).toHaveBeenCalledWith({ postID: 'zzzxxxccc111222', commentID: '9sid9csd9cis9dic' });
        expect(store.getState().commentStatus).toBe(StatusModel.ERROR);
    });

    it('removeComment/fulfilled', async() => {
        const mockedFetchOnePostCallback = jest.spyOn(
            OnePostThunks.prototype,
            'fetchOnePostCallback'
        );
        const mockedRemoveCommentCallback = jest.spyOn(
            OnePostThunks.prototype,
            'removeCommentCallback'
        );
        mockedFetchOnePostCallback.mockResolvedValue(post);
        mockedRemoveCommentCallback.mockResolvedValueOnce({post, status: 'success'});
        const store = configureStore({ reducer });
        await store.dispatch(fetchOnePost('zzzxxxccc111222'));
        await store.dispatch(removeComment({postID: 'zzzxxxccc111222', commentID: '9sid9csd9cis9dic'}));
        expect(mockedRemoveCommentCallback).toHaveBeenCalledTimes(1);
        expect(mockedRemoveCommentCallback).toHaveBeenCalledWith({postID: 'zzzxxxccc111222', commentID: '9sid9csd9cis9dic'});
        expect(store.getState().commentStatus).toBe(StatusModel.IDLE);
        expect(store.getState().active.post).toEqual(post);
    });
});
