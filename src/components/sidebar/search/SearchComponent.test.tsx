import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../../../store';
import * as actions from '../../../store/slices/filterSlice';
import { StatusModel } from '../../../models/StatusModel';
import SearchComponent from './SearchComponent';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedFindPostsAction = jest.spyOn(actions, 'findPosts');
const mockedClearSearchStatusAction = jest.spyOn(actions, 'clearSearchStatus');



describe('SearchComponent', () => {
    it('basic behavior', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({ searchStatus: StatusModel.IDLE });
        const component = render(
            <SearchComponent />
        );
        const searchInput = screen.getByPlaceholderText(/поиск по блогу.../i);

        expect(screen.getByAltText(/поиск/i)).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(screen.queryByTestId('clearBtn-test')).toBeNull();

        userEvent.type(searchInput, 'naruto');
        expect(searchInput).toHaveDisplayValue('naruto');
        expect(screen.getByTestId('clearBtn-test')).toBeInTheDocument();

        userEvent.click(screen.getByTestId('clearBtn-test'));
        expect(searchInput).toHaveDisplayValue('');
        expect(screen.queryByTestId('clearBtn-test')).toBeNull();
        expect(component).toMatchSnapshot();
    });

    it('status error', () => {
        mockedUseAppSelector.mockReturnValue({ searchStatus: StatusModel.ERROR });
        const component = render(
            <SearchComponent />
        );
        expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });

    it('actions calls', async() => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({ searchStatus: StatusModel.IDLE });
        const component = render(
            <SearchComponent />
        );
        expect(mockedFindPostsAction).toHaveBeenCalledTimes(0);
        expect(mockedClearSearchStatusAction).toHaveBeenCalledTimes(0);

        const searchInput = screen.getByPlaceholderText(/поиск по блогу.../i);
        userEvent.type(searchInput, 'naruto');
        setTimeout(() => {
            expect(mockedFindPostsAction).toHaveBeenCalledTimes(1);
            expect(mockedFindPostsAction).toHaveBeenCalledWith({
                type: '_query', 
                payload: 'NARUTO',
            });

            setTimeout(() => {
                expect(mockedClearSearchStatusAction).toHaveBeenCalledTimes(1);
            }, 3000);
        }, 1000);
        expect(component).toMatchSnapshot();
    });
});