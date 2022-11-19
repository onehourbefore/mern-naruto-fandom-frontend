import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils/test-utils';
import { setupStore } from '../../utils/test-utils/testStore';
import * as reduxHooks from '../../store';
import * as actions from '../../store/slices/onePostSlice';
import * as utils from './utils/checkIsLiked';
import FeedbackPanel from './FeedbackPanel';

import viewsIcon from '../../assets/png/view.png';
import likesIcon from '../../assets/png/like.png';
import likedIcon from '../../assets/png/liked.png';
import commentsIcon from '../../assets/png/comments.png';
import { AuthorizationState } from '../../models/AuthorizationModel';
import { StatusModel } from '../../models/StatusModel';
import userEvent from '@testing-library/user-event';

const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedCheckIsLiked = jest.spyOn(utils, 'checkIsLiked');
const mockedAddLikeAction = jest.spyOn(actions, 'addLike');
const mockedRemoveLikeAction = jest.spyOn(actions, 'removeLike');

const props = {
    activePost: {
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
    id: 'zzzxxxccc1212',
}

describe('FeedbackPanel', () => {
    it('render all elements, no liked post', () => {
        mockedCheckIsLiked.mockReturnValue(false);
        const state: { authorization: AuthorizationState } = {
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
        renderWithProviders({ elem: <FeedbackPanel { ...props } /> });

        expect(mockedCheckIsLiked).toHaveBeenCalledTimes(1);
        expect(mockedCheckIsLiked).toHaveBeenCalledWith(state.authorization.user.liked, props.activePost._id);

        expect(screen.getByAltText(/просмотры/i)).toBeInTheDocument();
        expect(screen.getByAltText(/просмотры/i)).toHaveAttribute('src', viewsIcon);
        expect(screen.getByText(props.activePost.views)).toBeInTheDocument();

        expect(screen.getByAltText(/лайки/i)).toBeInTheDocument();
        expect(screen.getByAltText(/лайки/i)).toHaveAttribute('src', likesIcon);
        expect(screen.getByText(props.activePost.likes)).toBeInTheDocument();

        expect(screen.getByAltText(/комментарии/i)).toBeInTheDocument();
        expect(screen.getByAltText(/комментарии/i)).toHaveAttribute('src', commentsIcon);
        expect(screen.getByText(props.activePost.comments.length)).toBeInTheDocument();
    });

    it('liked post', () => {
        mockedCheckIsLiked.mockReturnValue(true);
        const preloadedState: { authorization: AuthorizationState } = {
            authorization: {
                user: {
                    avatar: 'jakeAvater.jpg',
                    name: 'Jake',
                    email: 'jake@gmail.com',
                    id: 'zzzxxxccc1212',
                    created: 21,
                    liked: ['zzzxxxccc1212'],
                    role: 'user',
                },
                deleteProfileStatus: StatusModel.IDLE,
                status: StatusModel.SUCCESS,
            }
        };
        
        const state = setupStore(preloadedState).getState();
        renderWithProviders({ elem: <FeedbackPanel { ...props } /> }, { preloadedState: state });

        expect(mockedCheckIsLiked).toHaveBeenCalledTimes(1);
        expect(mockedCheckIsLiked).toHaveBeenCalledWith(preloadedState.authorization.user.liked, props.activePost._id);

        expect(screen.getByAltText(/лайки/i)).toBeInTheDocument();
        expect(screen.getByAltText(/лайки/i)).toHaveAttribute('src', likedIcon);
        expect(screen.getByText(props.activePost.likes)).toBeInTheDocument();
    });

    it('click on the like', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <FeedbackPanel { ...props } /> });

        expect(screen.getByAltText(/лайки/i)).toBeInTheDocument();

        userEvent.click(screen.getByAltText(/лайки/i));
        expect(mockedAddLikeAction).toHaveBeenCalledTimes(1);
        expect(mockedAddLikeAction).toHaveBeenCalledWith(props.id);
        expect(screen.getByAltText(/лайки/i)).toHaveAttribute('src', likedIcon);

        userEvent.click(screen.getByAltText(/лайки/i));
        expect(mockedRemoveLikeAction).toHaveBeenCalledWith(props.id);
        expect(mockedRemoveLikeAction).toHaveBeenCalledTimes(1);
        expect(screen.getByAltText(/лайки/i)).toHaveAttribute('src', likesIcon);
    });
});