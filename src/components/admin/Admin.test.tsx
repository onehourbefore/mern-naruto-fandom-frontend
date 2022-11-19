import { render, screen } from '@testing-library/react';
import Admin from './Admin';
import { hostName } from '../../api/apiData';


describe ('Admin', () => {
    const props = {
        name: 'Jake',
        email: 'jake@gmail.com',
        avatar: 'jakeAvatar.jpg',
        created: 20
    };

    it ('with any props', () => {
        render (<Admin { ...props } />)
        expect (screen.getByAltText (/аватар/i)).toBeInTheDocument ();
        expect (screen.getByText (props.name)).toBeInTheDocument ();
        expect (screen.getByText (props.email)).toBeInTheDocument ();
        expect (screen.getByText (`Созданных постов: ${props.created}`)).toBeInTheDocument ();
    });

    it ('needed attributes', () => {
        render (<Admin { ...props } />)
        expect (screen.getByAltText (/аватар/i)).toHaveAttribute ('src', `${hostName}/avatars/${props.avatar}`);
        expect (screen.getByTestId (props.email)).toHaveAttribute ('href', `mailto:${props.email}`)
    })
})