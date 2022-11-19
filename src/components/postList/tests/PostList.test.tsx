import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { hostName } from '../../../api/apiData';

import { renderWithProviders } from '../../../utils/test-utils/test-utils';
import { PostType } from '../../../models/PostModel';

import PostList from '../PostList';


jest.mock('../../../hooks/useScroll')

const validResponse: PostType[] = [
    {
        _id: 'zzzxxxccc1212',
        author: 'Jake',
        title: 'NARUTO',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Eos fuga deserunt, delectus alias quasi sint dolor, expedita 
        corporis aspernatur magni.`,
        tags: ['one', 'two'],
        likes: 21,
        comments: [],
        views: 213,
        image: 'narutoImage.jpg',
    },
    {
        _id: 'aaasss2211',
        author: 'Rob',
        title: 'SASUKE',
        content: `Voluptate numquam reprehenderit 
        molestias doloribus necessitatibus. Debitis atque hic facere.`,
        tags: ['three', 'four'],
        likes: 12,
        comments: [],
        views: 129,
        image: 'sasukeImage.jpg',
    },
];

const emptyResponse = [];


const handlers = (response?: any) => {
    return [
        rest.get(`${hostName}/api/posts`, (req, res, ctx) => {
            if (!response) return res (ctx.status (404), ctx.delay (250));
            return res (ctx.json (response), ctx.delay (250));
        })
    ]
};

const serverHelper = (server: any) => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
};


describe('PostList', () => {
    const server = setupServer(...handlers(validResponse));
    serverHelper (server);

    it('integration test', async () => {
        const component = renderWithProviders(
            { elem: <PostList /> }
        );
        const skeletons = await screen.findAllByTestId ('skeleton-test');
        expect(skeletons.length).toBe(2);

        const posts = await screen.findAllByTestId('post-root');
        expect(posts.length).toBe(2);
        expect(screen.getByText('NARUTO')).toBeInTheDocument();
        expect(screen.getByText('SASUKE')).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });
});