import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from '../../../store';

import { StatusModel } from '../../../models/StatusModel';
import { hostName } from '../../../api/apiData';
import { setupStore } from '../../../utils/test-utils/testStore';
import {
    getAuthorizationSelectorTestData as getAuthTestData,
    userIsAuth,
    userNoAuth,
} from './utils/defaultNavbarTestData';
import { getAuthorization } from '../../../selectors';
import DefaultNavbar from '../DefaultNavbar';

const mockedUseAppSelector = jest.spyOn (reduxHooks, 'useAppSelector');

describe ('Navbar', () => {
    it ('getAuthorizationSelector test', () => {
        const { isAuth, noAuth } = getAuthTestData;

        const stateWithLogin = setupStore (isAuth.preloadedState).getState ();
        expect (getAuthorization (stateWithLogin)).toEqual (isAuth.returnedState);

        const stateWithoutLogin = setupStore (noAuth.preloadedState).getState ();
        expect (getAuthorization (stateWithoutLogin)).toEqual (noAuth.returnedState);
    });

    it ('user no auth', () => {
        const state = {
            user: userNoAuth,
            status: StatusModel.IDLE
        }
        mockedUseAppSelector.mockReturnValue (state);
        render (
            <MemoryRouter>
                <DefaultNavbar />
            </MemoryRouter>
        );
        const logoApp = screen.getByAltText (/логотип/i);
        expect (logoApp).toBeInTheDocument ();
        expect (logoApp).toHaveAttribute ('src', 'navLogo.png');

        expect (screen.getByText (/главная/i)).toBeInTheDocument ();
        expect (screen.getByText (/новости/i)).toBeInTheDocument ();
        expect (screen.getByText (/авторы/i)).toBeInTheDocument ();
        expect (screen.getByText (/о нас/i)).toBeInTheDocument ();

        expect (screen.getByText (/войти/i)).toBeInTheDocument ();
        expect (screen.getByText (/регистрация/i)).toBeInTheDocument ();
    });

    it ('user is auth', () => {
        const state = {
            user: userIsAuth,
            status: StatusModel.SUCCESS
        };
        mockedUseAppSelector.mockReturnValue (state);
        render (
            <MemoryRouter>
                <DefaultNavbar />
            </MemoryRouter>
        );
        const logoApp = screen.getByAltText (/логотип/i);
        expect (logoApp).toBeInTheDocument ();
        expect (logoApp).toHaveAttribute ('src', 'navLogo.png');

        expect (screen.getByText (/главная/i)).toBeInTheDocument ();
        expect (screen.getByText (/новости/i)).toBeInTheDocument ();
        expect (screen.getByText (/авторы/i)).toBeInTheDocument ();
        expect (screen.getByText (/о нас/i)).toBeInTheDocument ();
        
        const avatar = screen.getByAltText (/аватар/i);
        expect (screen.getByText (/jake/i)).toBeInTheDocument ();
        expect (avatar).toBeInTheDocument ();
        expect (avatar).toHaveAttribute (
            'src', 
            `${hostName}/avatars/${state.user.avatar}`
        );

        expect (screen.queryByText (/войти/i)).toBeNull ();
        expect (screen.queryByText (/регистрация/i)).toBeNull ();
    });  
});