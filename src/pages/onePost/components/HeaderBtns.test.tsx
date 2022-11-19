import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as routerHooks from 'react-router';
import * as reduxHooks from '../../../store';
import * as postsActions from '../../../store/slices/postsSlice';
import * as editFormActions from '../../../store/slices/editFormSlice';
import { StatusModel } from '../../../models/StatusModel';
import HeaderBtns from './HeaderBtns';

import backIcon from '../../../assets/png/back.png';
import editIcon from '../../../assets/png/edit.png';
import { TasksEnum } from '../../../models/EditFormModel';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseNavigate = jest.spyOn(routerHooks, 'useNavigate');
const mockedClearCreatedAction = jest.spyOn(postsActions, 'clearCreated');
const mockedClearUpdatedAction = jest.spyOn(postsActions, 'clearUpdated');
const mockedSetEditFormAction = jest.spyOn(editFormActions, 'setEditForm');
const navigate = jest.fn();
const props = {
    postID: 'zzzxxxccc1212',
    authStatus: StatusModel.SUCCESS,
    userRole: 'user',
}

describe('HeaderBtns', () => {
    it('role: user', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        render(
            <MemoryRouter>
                <HeaderBtns { ...props }  />
            </MemoryRouter>
        );

        expect(screen.getByAltText(/назад к ленте постов/i)).toBeInTheDocument();
        expect(screen.getByAltText(/назад к ленте постов/i)).toHaveAttribute('src', backIcon);
        expect(screen.queryByAltText(/редактировать/i)).toBeNull();
    });

    it('role: admin', () => {
        const propsTwo = { ...props, userRole: 'admin' }
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseNavigate.mockReturnValue(navigate);
        render(
            <MemoryRouter>
                <HeaderBtns { ...propsTwo }  />
            </MemoryRouter>
        );
        expect(screen.getByAltText(/назад к ленте постов/i)).toBeInTheDocument();
        expect(screen.getByAltText(/назад к ленте постов/i)).toHaveAttribute('src', backIcon);
        expect(screen.getByAltText(/редактировать/i)).toBeInTheDocument();
        expect(screen.getByAltText(/редактировать/i)).toHaveAttribute('src', editIcon);

        userEvent.click(screen.getByAltText(/редактировать/i));
        expect(mockedClearCreatedAction).toHaveBeenCalledTimes(1);
        expect(mockedClearUpdatedAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledWith({
            postID: props.postID, 
            task: TasksEnum.UPDATE,
        });
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/editform');
    });
});