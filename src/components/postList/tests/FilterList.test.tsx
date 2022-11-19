import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test-utils/test-utils';
import { PostType } from '../../../models/PostModel';
import FilterList from '../FilterList';

const posts: PostType[] = [
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


describe('FilterList', () => {
    it('render with posts', () => {
        const component = renderWithProviders({ elem: <FilterList posts={posts}/> });
        expect(screen.getByText(/naruto/i)).toBeInTheDocument();
        expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
        expect(screen.getByText(/naruto/i)).toBeInTheDocument();
        expect(screen.getByText(/Voluptate numquam reprehenderit/i)).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });
});