import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../../store';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from '../../utils/test-utils/testStore';
import { StatusModel } from '../../models/StatusModel';
import Error from './Error';
import CloudTags from '../sidebar/cloudTags/CloudTags';


const mockedUseAppSelector = jest.spyOn (reduxHooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn (reduxHooks, 'useAppDispatch');

describe ('Error', () => {
    it ('render of main elements', () => {
        render (
            <MemoryRouter>
                <Error />
            </MemoryRouter>
        )
        expect (screen.getByAltText (/назад/i)).toBeInTheDocument ();
        expect (screen.getByAltText (/ошибка/i)).toBeInTheDocument ();
    });

    it ('click on back icon', () => {
        const returnedState = {
            posts: [],
            list: [],
            tags: [],
            fetchStatus: StatusModel.IDLE,
        };
        mockedUseAppSelector.mockReturnValue (returnedState);
        mockedUseAppDispatch.mockReturnValue (jest.fn ());
        render (
            <MemoryRouter>
                <Error />
                <CloudTags />
            </MemoryRouter>
        )
        const backIcon = screen.getByAltText (/назад/i);
        userEvent.click (backIcon);
        expect (screen.getByText (/облако тегов/i)).toBeInTheDocument ();
    });
});