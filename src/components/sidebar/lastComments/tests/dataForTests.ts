import { StatusModel } from "../../../../models/StatusModel";
import { CommentType } from "../../../../models/CommentsModel";

export const returnedStateLastCommentsTest = {
    posts: [{}, {}, {}, {}],
    comments: [
        {
            _id: 'zzzxxxccc121212',
            postID: 'aaasssddd223311',
            date: 'Thu Nov 10 2022 08:03:38 GMT+0300 (Москва, стандартное время)',
            name: 'Jake',
            email: 'jake@gmail.com',
            body: 'Hello World!!!',
            avatar: 'jakeAvatar.jpg',
        },
        {
            _id: '23wcewce2ewfwef',
            postID: 'zxlpczplxc1',
            date: 'Thu Nov 12 2022 08:08:38 GMT+0300 (Москва, стандартное время)',
            name: 'Rob',
            email: 'rob@gmail.com',
            body: 'Welcome!',
            avatar: 'robAvatar.jpg',
        },
        {
            _id: 'csd0cskd0csd',
            postID: 'ta6stc6tas6tca7stc',
            date: 'Thu Nov 12 2022 08:10:38 GMT+0300 (Москва, стандартное время)',
            name: 'Andy',
            email: 'andy@gmail.com',
            body: 'I like football',
            avatar: 'andyAvatar.jpg',
        },
        {
            _id: 'cs0dco0sodc0',
            postID: 't2f3etf23tfe2',
            date: 'Thu Nov 13 2022 07:43:38 GMT+0300 (Москва, стандартное время)',
            name: 'John',
            email: 'john@gmail.com',
            body: 'Oops',
            avatar: 'johnAvatar.jpg',
        }
    ],
    status: StatusModel.SUCCESS,
};

export const commentForTest: CommentType = {
    _id: 'zzxxcc1212',
    postID: 'qqwwee33221',
    date: 'Thu Nov 10 2022 07:07:13 GMT+0300 (Москва, стандартное время)',
    name: 'Jake',
    email: 'jake@gmail.com',
    body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Illum voluptate nihil esse ducimus, ipsa, animi delectus similique 
    facilis consectetur ipsum mollitia voluptates? Distinctio mollitia 
    pariatur culpa sapiente ea nesciunt dolores.`,
    avatar: 'jakeAvatar.img',
};