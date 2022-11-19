import { render, screen } from '@testing-library/react';
import * as reduxHooks from '../../../store';
import * as actions from '../../../store/slices/filterSlice';
import { StatusModel } from '../../../models/StatusModel';
import CloudTags from './CloudTags';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedGetAllTagsAction = jest.spyOn(actions, 'getAllTags');

const returnState = {
    posts: [],
    fetchStatus: StatusModel.LOADING,
    list: [],
};

describe('CloudTags', () => {
    it('status loading', async () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);
        const component = render(
            <CloudTags />
        );
        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();

        expect(component).toMatchSnapshot();
    });

    it('status success (posts.length = 0)', async () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            fetchStatus: StatusModel.SUCCESS,
            tags: ['first', 'second', 'third'],
        });
        const component = render(
            <CloudTags />
        );

        expect(screen.getByText('first')).toBeInTheDocument();
        expect(screen.getByText('second')).toBeInTheDocument();
        expect(screen.getByText('third')).toBeInTheDocument();
        expect(mockedGetAllTagsAction).toHaveBeenCalledTimes(0);

        expect(component).toMatchSnapshot();
    });

    it('status success (posts.length > 0)', async () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            fetchStatus: StatusModel.SUCCESS,
            posts: [{}, {}, {}],
            tags: ['first', 'second', 'third'],
        });
        const component = render(
            <CloudTags />
        );

        expect(screen.getByText('first')).toBeInTheDocument();
        expect(screen.getByText('second')).toBeInTheDocument();
        expect(screen.getByText('third')).toBeInTheDocument();
        expect(mockedGetAllTagsAction).toHaveBeenCalledTimes(1);

        expect(component).toMatchSnapshot();
    });
});