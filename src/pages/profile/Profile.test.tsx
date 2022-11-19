import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as actions from '../../store/slices/authorizationSlice';
import * as reduxHooks from '../../store';
import * as routerHooks from 'react-router';
import { renderWithProviders } from '../../utils/test-utils/test-utils';
import { RootState, setupStore } from '../../utils/test-utils/testStore';
import { UserDataType } from '../../models/AuthorizationModel';
import { StatusModel } from '../../models/StatusModel';
import { hostName } from '../../api/apiData';

import AppRouter from '../../components/AppRouter';
import Profile from './Profile';



const store = setupStore();
const preloadedState: RootState = store.getState();

const user: UserDataType = {
    id: 'zzzxxxccc1212',
    email: 'jake@gmail.com',
    name: 'Jake',
    role: 'user',
    avatar: 'jakeAvatar.jpg',
    created: 0,
    liked: [],
}

describe('Profile', () => {
    it('render of elements, auth role: user', () => {
        preloadedState.authorization = {
            user,
            status: StatusModel.SUCCESS,
            deleteProfileStatus: StatusModel.IDLE
        };
        renderWithProviders({ elem: <Profile /> }, { preloadedState });

        expect(screen.getByText(/имя профиля/i)).toBeInTheDocument();
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
        expect(screen.queryByText(user.created)).toBeNull();
        expect(screen.getByText(/выйти из профиля/i)).toBeInTheDocument();
        expect(screen.getByText(/выйти из профиля/i)).toHaveStyle({ textDecoration: 'none' });
        expect(screen.getByText(/удалить профиль/i)).toBeInTheDocument();

        expect(screen.getByAltText(/фото профиля/i)).toBeInTheDocument();
        expect(screen.getByAltText(/фото профиля/i))
            .toHaveAttribute('src', `${hostName}/avatars/${user.avatar}`);
    });

    it('render of elements, auth role: admin', () => {
        preloadedState.authorization = {
            user: { ...user, role: 'admin' },
            status: StatusModel.SUCCESS,
            deleteProfileStatus: StatusModel.IDLE
        };
        renderWithProviders({ elem: <Profile /> }, { preloadedState });

        expect(screen.getByText(/имя профиля/i)).toBeInTheDocument();
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText(user.created)).toBeInTheDocument();
        expect(screen.getByText(/выйти из профиля/i)).toBeInTheDocument();
        expect(screen.getByText(/выйти из профиля/i)).toHaveStyle({ textDecoration: 'none' });
        expect(screen.getByText(/удалить профиль/i)).toBeInTheDocument();

        expect(screen.getByAltText(/фото профиля/i)).toBeInTheDocument();
        expect(screen.getByAltText(/фото профиля/i))
            .toHaveAttribute('src', `${hostName}/avatars/${user.avatar}`);
    });
});


describe('Profile hooks and actions', () => {
    const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
    const mockedUseNavigate =  jest.spyOn(routerHooks, 'useNavigate');
    const mockedLogoutAction = jest.spyOn(actions, 'logout');
    const mockedDeleteProfileAction = jest.spyOn(actions, 'deleteProfile');
    const navigate = jest.fn();

    it('logoutAction and route to /', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseNavigate.mockReturnValue(navigate);
        
        renderWithProviders(
            { elem: <AppRouter />, path: '/profile'},
            { preloadedState }
        );

        expect(screen.getByText(/выйти из профиля/i)).toBeInTheDocument();
        expect(mockedLogoutAction).toHaveBeenCalledTimes(0);
        userEvent.click(screen.getByText(/выйти из профиля/i));
        expect(mockedLogoutAction).toHaveBeenCalledTimes(1);
        // expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
        // screen.debug();
    });

    it('deleteProfileAction and route to /', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseNavigate.mockReturnValue(navigate);
        
        renderWithProviders(
            { elem: <AppRouter />, path: '/profile'},
            { preloadedState }
        );

        expect(screen.getByText(/удалить профиль/i)).toBeInTheDocument();
        expect(mockedDeleteProfileAction).toHaveBeenCalledTimes(0);
        userEvent.click(screen.getByText(/удалить профиль/i));
        expect(mockedDeleteProfileAction).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/');
        // expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
        // screen.debug();
    });
})