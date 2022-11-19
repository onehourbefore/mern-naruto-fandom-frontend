import { render } from '@testing-library/react';
import { anyPostInfoProps as anyProps } from '../../../models/TestModels';
import PostInfo from './PostInfo';


describe ('PostInfo', () => {
    it ('icons', () => {
        const { getByAltText } = render (<PostInfo data={anyProps.data} />);
        expect (getByAltText (/просмотры/i)).toBeInTheDocument ();
        expect (getByAltText (/лайки/i)).toBeInTheDocument ();
        expect (getByAltText (/комментарии/i)).toBeInTheDocument ();
    })

    it ('info from props', () => {
        const { getByText } = render (<PostInfo { ...anyProps } />);
        const { likes, views, comments } = anyProps.data;
        expect (getByText (`${likes}`)).toBeInTheDocument ();
        expect (getByText (`${views}`)).toBeInTheDocument ();
        expect (getByText (`${comments.length}`)).toBeInTheDocument ();
    })
});