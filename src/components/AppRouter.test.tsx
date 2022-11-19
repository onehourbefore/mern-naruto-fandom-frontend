import { screen } from '@testing-library/react';
import { StatusModel } from '../models/StatusModel';
import { renderWithProviders } from '../utils/test-utils/test-utils';
import { setupStore } from '../utils/test-utils/testStore';
import AppRouter from './AppRouter';


describe('AppRouter', () => {
    it('no auth', () => {
        renderWithProviders({ elem: <AppRouter />, path: '/profile' });
        expect(screen.getByText(/страница не найдена!/i)).toBeInTheDocument();
    });

    it('auth', () => {
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            authorization: {
                user: {
                    id: 'zzzrzrdrd1r21',
                    email: 'jake@gmail.com',
                    name: 'Jake',
                    role: 'admin',
                    avatar: 'jakeAvatar.jpg',
                    created: 12,
                    liked: [],
                },
                status: StatusModel.SUCCESS,
                deleteProfileStatus: StatusModel.IDLE,
            },
        }
        renderWithProviders({ elem: <AppRouter />, path: '/profile' }, { preloadedState });
        expect(screen.getByText(/имя профиля/i)).toBeInTheDocument();
    });
});