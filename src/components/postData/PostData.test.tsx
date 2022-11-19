import { render, screen } from '@testing-library/react';
import { PostType } from '../../models/PostModel';
import PostData from './PostData';



const activePost: PostType = {
    tags: ['one', 'two'],
    title: 'ANIME',
    content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. In quisquam 
    accusamus reiciendis neque itaque nam, vel tenetur sit perspiciatis doloremque 
    voluptatibus ex rem non officia aut nulla corporis, dicta ducimus.`,
    author: 'Jake',
    _id: 'string',
    likes: 21,
    comments: [],
    views: 123,
    image: 'image.jpg',
};

describe('PostData', () => {
    it('render with post data', () => {
        const component = render(
            <PostData activePost={activePost} />
        );
        expect(screen.getByText(/one/i)).toBeInTheDocument();
        expect(screen.getByText(/two/i)).toBeInTheDocument();
        expect(screen.getByText(/автор: jake/i)).toBeInTheDocument();
        expect(screen.getByText(/anime/i)).toBeInTheDocument();
        expect(screen.getByText(/lorem ipsum dolor/i)).toBeInTheDocument();

        expect(component).toMatchSnapshot();
    });
});