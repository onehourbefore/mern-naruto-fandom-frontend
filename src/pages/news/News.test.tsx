import { screen } from '@testing-library/react';
import { RootState } from '../../store';
import { renderWithProviders } from '../../utils/test-utils/test-utils';
import { setupStore } from '../../utils/test-utils/testStore';
import { StatusModel } from '../../models/StatusModel';
import News from './News';

jest.mock('../../hooks/useScroll');

const store = setupStore();
const preloadedState: RootState = store.getState();
const post = {
    _id: 'zzzxxxccc111222',
    author: 'Jake',
    title: 'ANIME',
    content: 'Hello World!',
    tags: ['one', 'two'],
    likes: 21,
    comments: [],
    views: 123,
    image: 'bg.jpg',
}

describe('News', () => {
    it('filterlist is empty', () => {
        renderWithProviders({ elem: <News /> }, { preloadedState });
        expect(screen.queryByTestId('filterlist-test')).toBeNull();
        expect(screen.getByTestId('postlist-test')).toBeInTheDocument();
    });

    it('with posts in the filterlist', () => {
        preloadedState.filter = {
            list: [post],
            tags: ['one', 'two'],
            fetchStatus: StatusModel.SUCCESS,
            searchStatus: StatusModel.SUCCESS,
        };
        renderWithProviders({ elem: <News /> }, { preloadedState });
        expect(screen.getByTestId('filterlist-test')).toBeInTheDocument();
        expect(screen.getByText('ANIME')).toBeInTheDocument();
        expect(screen.getByText('Hello World!...')).toBeInTheDocument();
    });
});