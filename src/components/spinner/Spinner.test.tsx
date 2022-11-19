import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('without mt', () => {
        const component = render(
            <Spinner />
        );
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveStyle({ marginTop: '100px' });

        expect(component).toMatchSnapshot();
    });

    it('mt=200px', () => {
        const component = render(
            <Spinner mt='200px' />
        );
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveStyle({ marginTop: '200px' });

        expect(component).toMatchSnapshot();
    })
});