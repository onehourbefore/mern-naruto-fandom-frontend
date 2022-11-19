import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./../../../utils/test-utils/test-utils";
import { setupStore } from "./../../../utils/test-utils/testStore";
import { StatusModel } from "./../../../models/StatusModel";
import { RootState } from "./../../../store";
import { PostType } from "./../../../models/PostModel";
import { CommentType } from "./../../../models/CommentsModel";
import { UserDataType } from "./../../../models/AuthorizationModel";
import OnePost from "./../OnePost";

const mockedWindowScrollTo = jest.spyOn(window, 'scrollTo');
const store = setupStore();
const preloadedState: RootState = store.getState();

const user: UserDataType = {
    id: 'zzzxxxvvvababa12121',
    email: 'paul@gmail.com',
    name: 'Paul',
    role: 'user',
    avatar: 'paulAvatar.jpg',
    created: 0,
    liked: [],
};
const comments: CommentType[] = [
    {
        _id: 'zzzxxxccc111222',
        postID: 'cccxxxzzz222111',
        date: String(new Date()),
        name: 'Rob',
        email: 'rob@gmail.com',
        body: 'Welcome',
        avatar: 'robAvatar.jpg',
    },
    {
        _id: 'aaasssddd222111',
        postID: 'cccxxxzzz222111',
        date: String(new Date()),
        name: 'David',
        email: 'david@gmail.com',
        body: 'Hello',
        avatar: 'davidAvatar.jpg',
    }
];
const post: PostType = {
    _id: 'zzzxxx1212',
    author: 'Jake',
    title: 'ANIME',
    content: 'Hello world!',
    tags: ['one', 'two'],
    likes: 21,
    comments,
    views: 123,
    image: 'postImg.jpg',
};



describe('OnePost', () => {
    it('post status loading', () => {
        preloadedState.onePost = {
            active: { post: null, status: StatusModel.LOADING },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE,
        };
        renderWithProviders({ elem: <OnePost /> }, { preloadedState });
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('post status error', () => {
        preloadedState.onePost = {
            active: { post: null, status: StatusModel.ERROR },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE,
        };
        renderWithProviders({ elem: <OnePost /> }, { preloadedState });
        expect(screen.queryByTestId('spinner')).toBeNull();
        expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    it('post status success, user no auth', () => {
        preloadedState.onePost = {
            active: { post, status: StatusModel.SUCCESS },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE,
        };
        renderWithProviders({ elem: <OnePost /> }, { preloadedState });
        expect(screen.queryByTestId('spinner')).toBeNull();
        expect(screen.queryByTestId('error')).toBeNull();

        expect(screen.getByAltText(/назад/i)).toBeInTheDocument();
        expect(screen.queryByAltText(/редактировать/i)).toBeNull();

        expect(screen.getByText(/автор: jake/i)).toBeInTheDocument();
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('ANIME')).toBeInTheDocument();
        expect(screen.getByText('Hello world!')).toBeInTheDocument();

        expect(screen.queryByTestId('feedbackPanel')).toBeNull();
        expect(screen.queryByText(/- добавить комментарий -/i)).toBeNull();
        expect(screen.queryByTestId('commentForm')).toBeNull();
        expect(screen.queryByTestId('comment')).toBeNull();
    });

    it('post status success, user.role = user', () => {
        preloadedState.onePost = {
            active: { post, status: StatusModel.SUCCESS },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE,
        };
        preloadedState.authorization = {
            user,
            status: StatusModel.SUCCESS,
            deleteProfileStatus: StatusModel.IDLE,
        };
        renderWithProviders({ elem: <OnePost /> }, { preloadedState });
        expect(screen.queryByTestId('spinner')).toBeNull();
        expect(screen.queryByTestId('error')).toBeNull();

        expect(screen.getByAltText(/назад/i)).toBeInTheDocument();
        expect(screen.queryByAltText(/редактировать/i)).toBeNull();

        expect(screen.getByText(/автор: jake/i)).toBeInTheDocument();
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('ANIME')).toBeInTheDocument();
        expect(screen.getByText('Hello world!')).toBeInTheDocument();

        expect(screen.getByTestId('feedbackPanel')).toBeInTheDocument();
        expect(screen.getByText(/- добавить комментарий -/i)).toBeInTheDocument();
        expect(screen.queryByTestId('commentForm')).toBeNull();
        expect(screen.getByText('Welcome')).toBeInTheDocument();
        expect(screen.getByText('Hello')).toBeInTheDocument();

        userEvent.click(screen.getByText(/- добавить комментарий -/i));
        expect(screen.getByTestId('commentForm')).toBeInTheDocument();
    });

    it('post status success, user.role = admin', () => {
        preloadedState.onePost = {
            active: { post, status: StatusModel.SUCCESS },
            likeStatus: StatusModel.IDLE,
            commentStatus: StatusModel.IDLE,
        };
        preloadedState.authorization = {
            user: { ...user, role: 'admin' },
            status: StatusModel.SUCCESS,
            deleteProfileStatus: StatusModel.IDLE,
        };
        renderWithProviders({ elem: <OnePost /> }, { preloadedState });
        expect(screen.queryByTestId('spinner')).toBeNull();
        expect(screen.queryByTestId('error')).toBeNull();

        expect(screen.getByAltText(/назад/i)).toBeInTheDocument();
        expect(screen.getByAltText(/редактировать/i)).toBeInTheDocument();

        expect(screen.getByText(/автор: jake/i)).toBeInTheDocument();
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('ANIME')).toBeInTheDocument();
        expect(screen.getByText('Hello world!')).toBeInTheDocument();

        expect(screen.getByTestId('feedbackPanel')).toBeInTheDocument();
        expect(screen.getByText(/- добавить комментарий -/i)).toBeInTheDocument();
        expect(screen.queryByTestId('commentForm')).toBeNull();
        expect(screen.getByText('Welcome')).toBeInTheDocument();
        expect(screen.getByText('Hello')).toBeInTheDocument();

        userEvent.click(screen.getByText(/- добавить комментарий -/i));
        expect(screen.getByTestId('commentForm')).toBeInTheDocument();
    });
});