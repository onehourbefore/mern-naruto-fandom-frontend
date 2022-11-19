import { PostType, PostInfoProps } from "./PostModel";

export const anyPostInfoProps: PostInfoProps = {
    data: {
        likes: 32,
        views: 325,
        comments: [
            {
                _id: 'aaabbb1212',
                postID: 'bbbaaa2121',
                date: String (Date.now ()),
                name: 'Jake',
                email: 'jake@gmail.com',
                body: 'Hello Guys!!!',
                avatar: 'jakeAvatar.jpg'
            },
            {
                _id: 'aaabbb1212',
                postID: 'bbbaaa2121',
                date: String (Date.now ()),
                name: 'Jake',
                email: 'jake@gmail.com',
                body: 'Hello Guys!!!',
                avatar: 'jakeAvatar.jpg'
            },
            {
                _id: 'aaabbb1212',
                postID: 'bbbaaa2121',
                date: String (Date.now ()),
                name: 'Jake',
                email: 'jake@gmail.com',
                body: 'Hello Guys!!!',
                avatar: 'jakeAvatar.jpg'
            }
        ]
    }
};

export const anyPostProps: { post: PostType } = {
    post: {
        _id: 'aaabbb1212',
        author: 'Jake',
        title: 'Hello World!',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repudiandae esse eum laboriosam labore fugit officiis adipisci minima! Minima exercitationem tenetur voluptate. Dignissimos veniam id aut facilis? Porro, tempore quo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repudiandae esse eum laboriosam labore fugit officiis adipisci minima! Minima exercitationem tenetur voluptate. Dignissimos veniam id aut facilis? Porro, tempore quo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repudiandae esse eum laboriosam labore fugit officiis adipisci minima! Minima exercitationem tenetur voluptate. Dignissimos veniam id aut facilis? Porro, tempore quo?',
        tags: ['hello', 'first', 'guys'],
        likes: 12,
        comments: [
            {
                _id: 'aaabbb1212',
                postID: 'bbbaaa2121',
                date: String (Date.now ()),
                name: 'Jake',
                email: 'jake@gmail.com',
                body: 'Hello Guys!!!',
                avatar: 'jakeAvatar.jpg'
            },
            {
                _id: 'aaabbb1212',
                postID: 'bbbaaa2121',
                date: String (Date.now ()),
                name: 'Jake',
                email: 'jake@gmail.com',
                body: 'Hello Guys!!!',
                avatar: 'jakeAvatar.jpg'
            },
            {
                _id: 'aaabbb1212',
                postID: 'bbbaaa2121',
                date: String (Date.now ()),
                name: 'Jake',
                email: 'jake@gmail.com',
                body: 'Hello Guys!!!',
                avatar: 'jakeAvatar.jpg'
            }
        ],
        views: 321,
        image: 'anyBackground.img'
    }
};