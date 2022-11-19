import { render } from '@testing-library/react';
import About from './About';

describe ('AboutPage', () => {
    it ('render', () => {
        const { getByText } = render (<About />);
        expect (getByText (/вселенная наруто/i)).toBeInTheDocument ();
        expect (getByText (/даже те из нас кто бесконечно далек от мира манги и аниме/i)).toBeInTheDocument ();
    });
});