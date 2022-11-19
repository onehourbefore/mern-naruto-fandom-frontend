import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils/test-utils';
import Main from './Main';
import AppRouter from '../../components/AppRouter';

import narutoMain from '../../assets/png/narutoMain.png'
import stars from '../../assets/png/stars.png'
import starsTwo from '../../assets/png/stars2.png'
import vk from '../../assets/png/social/vk.png'
import instagram from '../../assets/png/social/instagram.png'
import facebook from '../../assets/png/social/facebook.png'

jest.mock('../../hooks/useScroll');

describe('Main', () => {
    it('render all elements', () => {
        render(
            <MemoryRouter>
                <Main />
            </MemoryRouter>
        );
        const narutoPng = screen.getByAltText(/naruto/i);
        const starsOnePng = screen.getByAltText(/first stars/i);
        const starsTwoPng = screen.getByAltText(/second stars/i);

        const instagramIcon = screen.getByAltText(/instagram/i);
        const facebookIcon = screen.getByAltText(/facebook/i);
        const vkIcon = screen.getByAltText(/vk/i);

        const openBtn = screen.getByTestId('openBtn-test');

        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
        expect(screen.getByText(/самое интересное из вселенной наруто/i)).toBeInTheDocument();

        expect(narutoPng).toBeInTheDocument();
        expect(narutoPng).toHaveAttribute('src', narutoMain);

        expect(starsOnePng).toBeInTheDocument();
        expect(starsOnePng).toHaveAttribute('src', stars);

        expect(starsTwoPng).toBeInTheDocument();
        expect(starsTwoPng).toHaveAttribute('src', starsTwo);

        expect(instagramIcon).toBeInTheDocument();
        expect(instagramIcon).toHaveAttribute('src', instagram);

        expect(facebookIcon).toBeInTheDocument();
        expect(facebookIcon).toHaveAttribute('src', facebook);

        expect(vkIcon).toBeInTheDocument();
        expect(vkIcon).toHaveAttribute('src', vk);

        expect(openBtn).toBeInTheDocument();
        expect(openBtn).toHaveStyle({ textDecoration: 'none' });
    });

    it('routing to /news', () => {
        renderWithProviders({ elem: <AppRouter /> });
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
        expect(screen.queryByText(/облако тегов/i)).toBeNull();
        const openBtn = screen.getByTestId('openBtn-test');
        userEvent.click(openBtn);
        expect(screen.getByText(/облако тегов/i)).toBeInTheDocument();
    });
});