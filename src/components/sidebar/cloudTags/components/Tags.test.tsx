import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../../../../store';
import * as actions from '../../../../store/slices/filterSlice';
import Tags from './Tags';

const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedFindPostsAction = jest.spyOn(actions, 'findPosts');


describe('Tags', () => {
    it('main behavior', () => {
        const returnState = {
            tags: ['firstTag', 'secondTag', 'thirdTag'],
        };
        const argForAction = {
            type: '_tag', 
            payload: returnState.tags[1].slice(1),
        }
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        const component = render(
            <Tags
                selectedTag='Hello'
                setSelectedTag={jest.fn()} />
        );

        expect(mockedFindPostsAction).toHaveBeenCalledTimes(0);
        expect(screen.getByText('firstTag')).toBeInTheDocument();
        expect(screen.getByText('secondTag')).toBeInTheDocument();
        expect(screen.getByText('thirdTag')).toBeInTheDocument();

        userEvent.click(screen.getByText('secondTag'));
        expect(mockedFindPostsAction).toHaveBeenCalledTimes(1);
        expect(mockedFindPostsAction).toHaveBeenCalledWith(argForAction);
        expect(component).toMatchSnapshot();
    });
});