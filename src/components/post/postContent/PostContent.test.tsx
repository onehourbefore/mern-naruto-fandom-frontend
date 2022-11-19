import { screen, render } from '@testing-library/react';
import { PostContentProps } from '../../../models/PostModel';
import PostContent from './PostContent';

describe ('PostContent', () => {
    const anyProps: PostContentProps = {
        data: {
            author: 'Jake',
            title: 'Welcome!',
            content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique a recusandae, deserunt ex quam accusantium beatae distinctio dolor! Blanditiis, quibusdam autem. Doloribus quod atque dolorem cum ex assumenda aspernatur et.',
            tags: ['hello', 'world', 'guys']
        }
    }

    it ('author', () => {
        const { getByText } = render (<PostContent { ...anyProps } />);
        const { author } = anyProps.data;
        expect (getByText (`Автор: ${author}`)).toBeInTheDocument ();
    })

    it ('title', () => {
        const { getByText } = render (<PostContent { ...anyProps } />);
        const { title } = anyProps.data;
        expect (getByText (`${title}`)).toBeInTheDocument ();
    })

    it ('content', () => {
        const { getByText } = render (<PostContent { ...anyProps} />);
        const { content } = anyProps.data;
        expect (getByText (`${content.slice (0, 250)}...`)).toBeInTheDocument ();
    })

    it ('tags', () => {
        const { getByText } = render (<PostContent { ...anyProps } />);
        const { tags } = anyProps.data;
        tags.map (item => {
            expect (getByText (`${item}`)).toBeInTheDocument ();
        });
    })
})