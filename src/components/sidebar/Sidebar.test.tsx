import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { StatusModel } from '../../models/StatusModel';
import { TasksEnum } from '../../models/EditFormModel';
import * as reduxHooks from '../../store';
import * as actions from '../../store/slices/editFormSlice';
import Sidebar from './Sidebar';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedSetEditFormAction = jest.spyOn(actions, 'setEditForm');

const returnState = {
    list: [],
    tags: ['one', 'two', 'three'],
    status: StatusModel.IDLE,
    user: { role: '' },
    searchStatus: StatusModel.IDLE,
    posts: [{}, {}, {}],
    fetchStatus: StatusModel.IDLE,
    comments: [],
    task: TasksEnum.CREATE,
};

describe('Sidebar', () => {
    it('no auth', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        const component = render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );
        expect(screen.getByPlaceholderText(/поиск по блогу.../i)).toBeInTheDocument();
        expect(screen.queryByText(/создать/i)).toBeNull();
        expect(screen.queryByText(/новый пост/i)).toBeNull();
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('three')).toBeInTheDocument();
        expect(screen.queryByText(/последние комментарии/i)).toBeNull();
        expect(component).toMatchSnapshot();
    });

    it('auth: { role: admin }', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            status: StatusModel.SUCCESS,
            user: { role: 'admin' },
        });

        const component = render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        );
        expect(screen.getByPlaceholderText(/поиск по блогу.../i)).toBeInTheDocument();
        expect(screen.getByText(/создать/i)).toBeInTheDocument();
        expect(screen.getByText(/новый пост/i)).toBeInTheDocument();
        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
        expect(screen.getByText('three')).toBeInTheDocument();
        expect(screen.queryByText(/последние комментарии/i)).toBeNull();

        userEvent.click(screen.getByTestId('createPostBtn-test'));
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledWith({
            postID: '',
            task: TasksEnum.CREATE,
        });
        expect(component).toMatchSnapshot();
    });
});