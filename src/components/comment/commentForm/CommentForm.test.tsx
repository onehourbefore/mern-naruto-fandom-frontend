import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../../../store';
import * as actions from '../../../store/slices/onePostSlice';
import CommentForm from './CommentForm';

const mockedWindowScrollTo = jest.spyOn(window, 'scrollTo');
const mockedWindowAlert = jest.spyOn(window, 'alert');
const mockedUseAppSelector = jest.spyOn (reduxHooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn (reduxHooks, 'useAppDispatch');
const mockedAddComment = jest.spyOn (actions, 'addComment');

const renderWithMockedHooks = () => {
    const dispatch = jest.fn ();
    mockedUseAppSelector.mockReturnValue ('aaaxxxzzz1212');
    mockedUseAppDispatch.mockReturnValue (dispatch);
    return render (<CommentForm setVisible={jest.fn ()} key={'zxc'} />);
}


describe ('CommentForm', () => {
    it ('render of main elements', () => {
        renderWithMockedHooks ();
        expect (screen.getByPlaceholderText (/введите текст.../i)).toBeInTheDocument ();
        expect (screen.getByText (/отправить/i)).toBeInTheDocument ();
        expect (screen.getByText (/очистить/i)).toBeInTheDocument ();
    });

    it ('clearing the comment form', () => {
        renderWithMockedHooks ();
        const textArea = screen.getByPlaceholderText (/введите текст.../i);
        const clearBtn = screen.getByText (/очистить/i);

        userEvent.type (textArea, 'Hello World!');
        expect (screen.getByText ('Hello World!')).toBeInTheDocument ();
        userEvent.click (clearBtn);
        expect (screen.queryByText ('Hello World!')).toBeNull ();
    });

    it ('send valid comment', () => {
        renderWithMockedHooks ();
        const commentBody = 'Hello world!';

        expect (screen.getByPlaceholderText (/введите текст.../i)).toBeInTheDocument ();

        userEvent.type (screen.getByPlaceholderText (/введите текст.../i), commentBody);
        expect (screen.getByText (commentBody)).toBeInTheDocument ();

        userEvent.click (screen.getByText (/отправить/i));
        expect (mockedAddComment).toHaveBeenCalledTimes (1);
        expect (mockedAddComment).toHaveBeenCalledWith ({ postID: 'aaaxxxzzz1212', body: commentBody });
        expect (screen.queryByText (commentBody)).not.toBeInTheDocument ();
    });

    it ('send empty comment', () => {
        renderWithMockedHooks ();
        userEvent.click (screen.getByText (/отправить/i));
        expect (mockedAddComment).toHaveBeenCalledTimes (0);
    });
});