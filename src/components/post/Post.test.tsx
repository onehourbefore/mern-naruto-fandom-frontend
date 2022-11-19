import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as reduxHooks from '../../store/index';
import * as onePostActions from '../../store/slices/onePostSlice';
import * as postsActions from '../../store/slices/postsSlice';

import { PostType } from '../../models/PostModel';
import { StatusModel } from '../../models/StatusModel';
import { hostName } from '../../api/apiData';

import Post from './Post';
import HeaderBtns from '../../pages/onePost/components/HeaderBtns';


const post: PostType = {
    _id: 'xxxccczzz1212',
    author: 'Jake',
    title: 'ANIME',
    content: 'Hello World!',
    tags: ['one', 'two'],
    likes: 32,
    comments: [],
    views: 231,
    image: 'bgImage.jpg',
}

const imgPath = `${hostName}/postImages/${post.image}`;

const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedClearActivePostAction = jest.spyOn(onePostActions, 'clearActivePost');
const mockedDeletePostAction = jest.spyOn(postsActions, 'deletePost');


describe('Post', () => {
    it('No Auth', () => {
        const state = {
            user: { role: '' },
            status: StatusModel.IDLE,
        };
        const dispatch = jest.fn();
        mockedUseAppDispatch.mockReturnValue(dispatch);
        mockedUseAppSelector.mockReturnValue(state)
        render(
            <MemoryRouter>
                <Post post={post} />
            </MemoryRouter>
        );
        
        expect(screen.getByTestId('post-root')).toBeInTheDocument();
        expect(screen.getByTestId('post-root')).toHaveStyle({
            background: `linear-gradient(180deg, 
                rgba(10, 10, 10, 0.8), rgba(0, 0, 0, 1)), 
                url(${imgPath}) center center/cover no-repeat`});

        expect(screen.queryByAltText(/удалить пост/i)).toBeNull();
        expect(screen.queryByAltText(/комментарии/i)).toBeNull();
        expect(screen.queryByAltText(/лайки/i)).toBeNull();
        expect(screen.queryByAltText(/просмотры/i)).toBeNull();

        expect(screen.getByText(/автор: jake/i)).toBeInTheDocument();
        expect(screen.getByText(/anime/i)).toBeInTheDocument();
        expect(screen.getByText(/Hello World!/i)).toBeInTheDocument();
        expect(screen.getByText(/one/i)).toBeInTheDocument();
        expect(screen.getByText(/two/i)).toBeInTheDocument();
    });

    it('Auth, user', () => {
        const state = {
            user: { role: 'user' },
            status: StatusModel.SUCCESS,
        };
        const dispatch = jest.fn();
        mockedUseAppDispatch.mockReturnValue(dispatch);
        mockedUseAppSelector.mockReturnValue(state);
        render(
            <MemoryRouter>
                <Post post={post} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('post-root')).toBeInTheDocument();
        expect(screen.getByTestId('post-root')).toHaveStyle({
            background: `linear-gradient(180deg, 
                rgba(10, 10, 10, 0.8), rgba(0, 0, 0, 1)), 
                url(${imgPath}) center center/cover no-repeat`});

        expect(screen.queryByAltText(/удалить пост/i)).toBeNull();
        expect(screen.getByAltText(/комментарии/i)).toBeInTheDocument();
        expect(screen.getByAltText(/лайки/i)).toBeInTheDocument();
        expect(screen.getByAltText(/просмотры/i)).toBeInTheDocument();
    });

    it('Auth, admin', () => {
        const state = {
            user: { role: 'admin' },
            status: StatusModel.SUCCESS,
        };
        const dispatch = jest.fn();
        mockedUseAppDispatch.mockReturnValue(dispatch);
        mockedUseAppSelector.mockReturnValue(state);
        render(
            <MemoryRouter>
                <Post post={post} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('post-root')).toBeInTheDocument();
        expect(screen.getByTestId('post-root')).toHaveStyle({
            background: `linear-gradient(180deg, 
                rgba(10, 10, 10, 0.8), rgba(0, 0, 0, 1)), 
                url(${imgPath}) center center/cover no-repeat`});

        expect(screen.getByAltText(/удалить пост/i)).toBeInTheDocument();
        expect(screen.getByAltText(/комментарии/i)).toBeInTheDocument();
        expect(screen.getByAltText(/лайки/i)).toBeInTheDocument();
        expect(screen.getByAltText(/просмотры/i)).toBeInTheDocument();
    });

    it('actions calls', () => {
        const state = {
            user: { role: 'admin' },
            status: StatusModel.SUCCESS,
        };
        const dispatch = jest.fn();
        mockedUseAppDispatch.mockReturnValue(dispatch);
        mockedUseAppSelector.mockReturnValue(state);
        render(
            <MemoryRouter>
                <Post
                    post={post}
                />
                <HeaderBtns
                    postID='xxxccczzz1212'
                    authStatus={state.status}
                    userRole={state.user.role}
                />
            </MemoryRouter>
        );

        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(mockedClearActivePostAction).toHaveBeenCalledTimes(0);
        expect(mockedDeletePostAction).toHaveBeenCalledTimes(0);

        userEvent.click(screen.getByAltText(/удалить пост/i));
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(mockedDeletePostAction).toHaveBeenCalledTimes(1);
        expect(mockedDeletePostAction).toHaveBeenCalledWith('xxxccczzz1212');

        userEvent.click(screen.getByTestId('post-root'));
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockedClearActivePostAction).toHaveBeenCalledTimes(1);
        expect(screen.getByAltText(/назад/i)).toBeInTheDocument();
        expect(screen.getByAltText(/редактировать/i)).toBeInTheDocument();
    });
});