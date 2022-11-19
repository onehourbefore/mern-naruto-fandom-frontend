import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from '../../../../store';
import * as actions from '../../../../store/slices/onePostSlice';
import { hostName } from '../../../../api/apiData';
import { StatusModel } from '../../../../models/StatusModel';
import { commentForTest as comment } from './dataForTests';
import CommentFromSidebar from '../CommentFromSidebar';
import HeaderBtns from '../../../../pages/onePost/components/HeaderBtns';



const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedFetchOnePostAction = jest.spyOn(actions, 'fetchOnePost');


describe('CommentFromSidebar', () => {
    it('first render with comment data', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        const component = render(
            <MemoryRouter>
                <CommentFromSidebar comment={comment}/>
            </MemoryRouter>
        );
        const avatar = screen.getByAltText(/аватар/i);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', `${hostName}/avatars/jakeAvatar.img`);
        expect(screen.getByText('Jake')).toBeInTheDocument();
        expect(screen.getByText('jake@gmail.com')).toBeInTheDocument();
        expect(screen.queryByText(comment.body)).toBeNull();
        expect(screen.getByText(`${comment.body.slice(0, 41)}...`)).toBeInTheDocument();
        expect(screen.getByText('10 Nov 2022')).toBeInTheDocument();
        expect(screen.getByText('07:07')).toBeInTheDocument();

        expect(component).toMatchSnapshot();
    });

    it('click to comment', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        const component = render(
            <MemoryRouter>
                <CommentFromSidebar comment={comment}/>
                <HeaderBtns
                    authStatus={StatusModel.SUCCESS}
                    postID={comment.postID}
                    userRole="admin" />
            </MemoryRouter>
        );

        const commentDiv = screen.getByTestId('commentFromSidebar-test');
        expect(mockedFetchOnePostAction).toHaveBeenCalledTimes(0);
        userEvent.click(commentDiv);
        expect(mockedFetchOnePostAction).toHaveBeenCalledTimes(1);
        expect(mockedFetchOnePostAction).toHaveBeenCalledWith(comment.postID);
        expect(screen.getByAltText(/назад/i)).toBeInTheDocument();
        expect(screen.getByAltText(/редактировать/i)).toBeInTheDocument();
        
        expect(component).toMatchSnapshot();
    });
});
