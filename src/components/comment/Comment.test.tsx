import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../../store/index';
import * as actions from '../../store/slices/onePostSlice';
import { CommentProps } from '../../models/CommentsModel';
import { hostName } from '../../api/apiData';
import { formatDate } from '../../utils/formatDate';
import Comment from './Comment';
import { UserDataType } from '../../models/AuthorizationModel';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedRemoveComment = jest.spyOn(actions, 'removeComment');

const props: CommentProps = {
    data: {
        _id: 'aaazzzxxx1212',
        name: 'Jake',
        email: 'jake@gmail.com',
        body: 'Hello World !!!',
        avatar: 'jakeAvatar.jpg',
        date: 'Sun Oct 30 2022 09:50:48 GMT+0300 (Москва, стандартное время)',
    },
    postID: 'zzzxxxccc2211',
    commentIndex: 4,
};

const auth: { user: {role: 'user' | 'admin'} } = {
    user: { role: 'user' },
}

const renderWithMockedHooks = (auth: {user: {role: 'user' | 'admin'}}) => {
    mockedUseAppSelector.mockReturnValue(auth);
    mockedUseAppDispatch.mockReturnValue(jest.fn());
    render(<Comment { ...props } />);
};


describe('Comment', () => {
    it('render of main elements (role: user)', () => {
        renderWithMockedHooks({ user: {role: 'user'} });
        const { name, email, avatar, body, date } = props.data;
        expect(screen.queryByAltText(/удалить комментарий/i)).toBeNull();
        const avatarElem = screen.getByAltText(/аватар/i);
        expect(avatarElem).toBeInTheDocument();
        expect(avatarElem).toHaveAttribute('src', `${hostName}/avatars/${avatar}`);
        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(email)).toBeInTheDocument();
        const [newDate, time] = formatDate(date);
        expect(screen.getByTestId('commentDate')).toContainHTML(`${newDate}<br />${time}`);
        expect(screen.getByText(body)).toBeInTheDocument();
    });

    it('render delete icon (role: admin)', () => {
        renderWithMockedHooks({ user: {role: 'admin'} });
        expect(screen.getByAltText(/удалить комментарий/i)).toBeInTheDocument();
    });

    it('redux hooks and removeComment action calls', () => {
        renderWithMockedHooks({ user: {role: 'admin'} });
        const { postID, data } = props;
        const deleteIcon = screen.getByAltText(/удалить комментарий/i)
        expect(deleteIcon).toBeInTheDocument();
        userEvent.click(deleteIcon);
        expect(mockedRemoveComment).toHaveBeenCalledTimes(1);
        expect(mockedRemoveComment).toHaveBeenCalledWith({ postID, commentID: data._id });
    });
});