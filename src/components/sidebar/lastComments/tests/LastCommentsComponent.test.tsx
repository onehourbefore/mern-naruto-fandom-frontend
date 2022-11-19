import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StatusModel } from '../../../../models/StatusModel';
import * as reduxHooks from '../../../../store';
import * as actions from '../../../../store/slices/commentSlice';
import LastCommentsComponent from '../LastCommentsComponent';
import { returnedStateLastCommentsTest as state } from './dataForTests';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedFetchCommentsAction = jest.spyOn(actions, 'fetchComments');


describe('LastCommentsComponent', () => {
    it('fetch status loading', async () => {
        // console.log(String(new Date()));
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...state,
            posts: [],
            comments: [],
            status: StatusModel.LOADING,
        });

        const component = render(
            <MemoryRouter>
                <LastCommentsComponent />
            </MemoryRouter>
        );
        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(mockedFetchCommentsAction).toHaveBeenCalledTimes(0);
        expect(component).toMatchSnapshot();
    });

    it('fetch status success', async () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(state);

        const component = render(
            <MemoryRouter>
                <LastCommentsComponent />
            </MemoryRouter>
        );
        expect(screen.getByText(/последние комментарии/i)).toBeInTheDocument();

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('john@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('Oops')).toBeInTheDocument();

        expect(screen.getByText('Andy')).toBeInTheDocument();
        expect(screen.getByText('andy@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('I like football')).toBeInTheDocument();
        
        expect(screen.getByText('Rob')).toBeInTheDocument();
        expect(screen.getByText('rob@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('Welcome!')).toBeInTheDocument();

        expect(mockedFetchCommentsAction).toHaveBeenCalledTimes(1);
        expect(component).toMatchSnapshot();
    });
});