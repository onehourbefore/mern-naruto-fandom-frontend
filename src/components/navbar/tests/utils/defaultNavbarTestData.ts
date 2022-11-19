import { StatusModel } from "../../../../models/StatusModel";

export const userIsAuth = {
    id: 'aassdd1122',
    email: 'jake@gmail.com',
    name: 'Jake',
    role: 'user',
    avatar: 'jakeAvatar.jpg',
    created: 7,
    liked: [],
};

export const userNoAuth = {
    id: '',
    email: '',
    name: '',
    role: 'user',
    avatar: '',
    created: 0,
    liked: [],
};

export const getAuthorizationSelectorTestData = {
    isAuth: {
        preloadedState: {
            authorization: {
                user: userIsAuth,
                status: StatusModel.SUCCESS,
                deleteProfileStatus: StatusModel.IDLE,
            }
        },
        returnedState: {
            user: userIsAuth,
            status: StatusModel.SUCCESS,
            deleteProfileStatus: StatusModel.IDLE,
        }
    },
    noAuth: {
        preloadedState: {
            authorization: {
                user: userNoAuth,
                status: StatusModel.IDLE,
                deleteProfileStatus: StatusModel.IDLE,
            }
        },
        returnedState: {
            user: userNoAuth,
            status: StatusModel.IDLE,
            deleteProfileStatus: StatusModel.IDLE,
        }
    }
};