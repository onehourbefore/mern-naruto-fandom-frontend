import { screen } from '@testing-library/react';
import Page404 from './Page404';
import AppRouter from '../../components/AppRouter';
import { renderWithProviders } from '../../utils/test-utils/test-utils';

import back from '../../assets/png/back.png'
import error from '../../assets/png/error.png'
import userEvent from '@testing-library/user-event';

describe('Page404', () => {
    it('render of elements', () => {
        renderWithProviders({ elem: <Page404 /> });

        expect(screen.getByAltText(/назад/i)).toBeInTheDocument();
        expect(screen.getByAltText(/назад/i)).toHaveAttribute('src', back);
        expect(screen.getByAltText(/ошибка/i)).toBeInTheDocument();
        expect(screen.getByAltText(/ошибка/i)).toHaveAttribute('src', error);
        expect(screen.getByText(/страница не найдена!/i)).toBeInTheDocument();
    });

    it('routing to /main', () => {
        renderWithProviders({ elem: <AppRouter />, path: '/profile' });
        
        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getByAltText(/назад/i));
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });
})