import { setupStore } from '../utils/test-utils/testStore';
import * as selectors from './index';
import { AuthorizationState } from "../models/AuthorizationModel";
import { CommentsState } from "../models/CommentsModel";
import { EditFormState, TasksEnum } from "../models/EditFormModel";
import { ExpertsState } from "../models/ExpertsModel";
import { FilterState } from "../models/FilterModel";
import { PostsState, OnePostState } from "../models/PostModel";
import { RegistrationState } from "../models/RegistrationModel";
import { StatusModel } from '../models/StatusModel';


describe('getAuthorization', () => {
    const filledState: { authorization: AuthorizationState } = {
        authorization: {
            user: {
                avatar: 'jakeAvater.jpg',
                name: 'Jake',
                email: 'jake@gmail.com',
                id: 'zzzxxxccc1212',
                created: 21,
                liked: [],
                role: 'user',
            },
            deleteProfileStatus: StatusModel.IDLE,
            status: StatusModel.SUCCESS,
        }
    };

    it ('empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getAuthorization(state)).toEqual({
            deleteProfileStatus: "idle",
            status: "idle",
            user: {
                avatar: "", 
                created: 0, 
                email: "",
                id: "",
                liked: [],
                name: "",
                role: ""
            }
        });
    });

    it ('filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getAuthorization(state)).toEqual(filledState.authorization);
    });
});


describe('getExperts', () => {
    const filledState: { experts: ExpertsState } = {
        experts: {
            experts: [
                {
                    name: 'Jake',
                    avatar: 'jakeAvatar.jpg',
                    email: 'jake@gmail.com',
                    created: 20,
                },
                {
                    name: 'John',
                    avatar: 'johnAvatar.jpg',
                    email: 'john@gmail.com',
                    created: 13,
                }
            ],
            status: StatusModel.SUCCESS,
        }
    };

    it ('empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getExperts(state)).toEqual({
            experts: [],
            status: "idle",
        });
    });

    it ('filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getExperts(state)).toEqual(filledState.experts);
    });
});


describe('getFilter', () => {
    const filledState: { filter: FilterState } = {
        filter: {
            list: [
                {
                    _id: 'zzzxxxccc1212',
                    author: 'Jake',
                    title: 'NARUTO',
                    content: 'Hello World',
                    tags: ['one', 'two'],
                    likes: 21,
                    comments: [],
                    views: 213,
                    image: 'bg.jpg',
                },
            ],
            tags: ['one', 'two', 'three'],
            fetchStatus: StatusModel.SUCCESS,
            searchStatus: StatusModel.SUCCESS,
        }
    };

    it ('empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getFilter(state)).toEqual({
            list: [],
            tags: [],
            fetchStatus: "idle",
            searchStatus: "idle",
        });
    });

    it ('filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getFilter(state)).toEqual(filledState.filter);
    });
});


describe('getComments', () => {
    const filledState: { comments: CommentsState } = {
        comments: {
            comments: [
                {
                    _id: 'aaasssddd222111',
                    postID: 'zxzx2323',
                    date: String(new Date()),
                    name: 'Rob',
                    email: 'rob@gmail.com',
                    body: 'Welcome',
                    avatar: 'robAvatar.jpg',
                }
            ],
            status: StatusModel.SUCCESS,
        }
    };

    it ('empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getComments(state)).toEqual({
            comments: [],
            status: "idle",
        });
    });

    it ('filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getComments(state)).toEqual(filledState.comments);
    });
});


describe('getEditForm', () => {
    const filledState: { editForm: EditFormState } = {
        editForm: {
            postID: 'qqqwwweee222111',
            task: TasksEnum.UPDATE,
        }
    };

    it ('empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getEditForm(state)).toEqual({
            postID: "",
            task: "idle",
        });
    });

    it ('filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getEditForm(state)).toEqual(filledState.editForm);
    });
});


describe('getRegistration', () => {
    const filledState: { registration: RegistrationState } = {
        registration: {
            status: StatusModel.SUCCESS,
        }
    };

    it ('empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getRegistration(state)).toEqual({
            status: StatusModel.IDLE,
        });
    });

    it ('filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getRegistration(state)).toEqual(filledState.registration);
    });
});


describe('getPosts and getPostsAll', () => {
    const filledState: { posts: PostsState } = {
        posts: {
            all: { posts: [
                {
                    _id: 'zzzxxxccc1212',
                    author: 'David',
                    title: 'ANIME',
                    content: 'Hello world Hello world Hello world',
                    tags: ['one', 'anime'],
                    likes: 8,
                    comments: [],
                    views: 213,
                    image: 'bg1.jpg',
                },
                {
                    _id: 'gsygdysgd7773',
                    author: 'John',
                    title: 'SASUKE',
                    content: 'Welcome hello welcome hello',
                    tags: ['two', 'sasuke'],
                    likes: 10,
                    comments: [],
                    views: 156,
                    image: 'bg2.jpg',
                },
            ], status: StatusModel.SUCCESS },
            created: { post: null, status: StatusModel.IDLE },
            updated: { post: null, status: StatusModel.IDLE },
            deleted: { post: null, status: StatusModel.IDLE },
            count: { count: 2, status: StatusModel.SUCCESS },
        }
    };

    it ('getPosts empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getPosts(state)).toEqual({
                all: {
                    posts: [],
                    status: "idle",
                },
                count: {
                    count: 0,
                    status: "idle",
                },
                created: {
                    post: null,
                    status: "idle",
                },
                deleted: {
                    post: null,
                    status: "idle",
                },
                updated: {
                    post: null,
                    status: "idle",
                },
            }
        );
    });

    it ('getPosts filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getPosts(state)).toEqual(filledState.posts);
    });

    it ('getPostsAll empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getPostsAll(state)).toEqual({
            posts: [],
            status: "idle",
        });
    });

    it ('getPostsAll filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getPostsAll(state)).toEqual(filledState.posts.all);
    });
});


describe('getOnepostActive and getOnepostActivePostID', () => {
    const filledState: { onePost: OnePostState } = {
        onePost: {
            active: {
                post: {
                    _id: 'zzzxxxccc1212',
                    author: 'David',
                    title: 'ANIME',
                    content: 'Hello world Hello world Hello world',
                    tags: ['one', 'anime'],
                    likes: 8,
                    comments: [],
                    views: 213,
                    image: 'bg1.jpg',
                },
                status: StatusModel.SUCCESS
            },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE,
        }
    }

    it('getOnepostActive empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getOnepostActive(state)).toEqual({
            post: null,
            status: StatusModel.IDLE,
        });  
    });

    it('getOnepostActive filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getOnepostActive(state)).toEqual(filledState.onePost.active);  
    });

    it('getOnepostActivePostID empty state', () => {
        const state = setupStore().getState();
        expect(selectors.getOnepostActivePostID(state)).toBeUndefined();  
    });

    it('getOnepostActivePostID filled state', () => {
        const state = setupStore(filledState).getState();
        expect(selectors.getOnepostActivePostID(state)).toEqual(filledState.onePost.active.post?._id);  
    });
});