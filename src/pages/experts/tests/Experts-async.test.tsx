import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';

import { handlers } from './utils/handlers';
import { renderWithProviders } from '../../../utils/test-utils/test-utils';
import { validResponse } from './utils/validResponse';
import { useScroll } from '../../../hooks/useScroll';

import Experts from '../Experts';
import { PostType } from '../../../models/PostModel';

jest.mock('../../../hooks/useScroll');

const serverHelper = (response: any) => {
    const server = setupServer(...handlers(response));
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
};


describe ('Experts fulfilled', () => {
    serverHelper([]);
    
    it ('empty response []', async () => {
        renderWithProviders({ elem: <Experts />});
        expect(screen.getByText(/администраторы/i)).toBeInTheDocument();

        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(await screen.findByText (/администраторов в данный момент нет/i)).toBeInTheDocument();
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
});


describe ('Experts rejected', () => {
    serverHelper(null);

    it ('error', async () => {
        renderWithProviders({ elem: <Experts /> });
        expect(screen.getByText(/администраторы/i)).toBeInTheDocument();
        
        const error = await screen.findByTestId('error');
        expect(error).toBeInTheDocument();
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
});


describe ('Experts fullfilled', () => {
    serverHelper(validResponse);

    it ('2 experts', async() => {
        renderWithProviders({ elem: <Experts /> });
        expect(screen.getByText(/администраторы/i)).toBeInTheDocument();

        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();

        const experts = await screen.findAllByTestId ('admin-item');
        expect(experts.length).toBe (2);
        expect(screen.getByText ('DOCTOR')).toBeInTheDocument();
        expect(screen.getByText ('admin@gmail.com')).toBeInTheDocument();
        expect(screen.getByText ('LOLA')).toBeInTheDocument();
        expect(screen.getByText ('admin2@gmail.com')).toBeInTheDocument();

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
});