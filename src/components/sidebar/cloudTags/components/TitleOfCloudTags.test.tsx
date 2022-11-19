import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from '../../../../store/';
import * as actions from '../../../../store/slices/filterSlice';
import { PostType } from '../../../../models/PostModel';
import TitleOfCloudTags from './TitleOfCloudTags';


const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedClearFilteredAction = jest.spyOn(actions, 'clearFiltered');

const postList: PostType[] = [
    {
        _id: '',
        author: '',
        title: '',
        content: '',
        tags: [],
        likes: 21,
        comments: [],
        views: 21,
        image: '',
    },
    {
        _id: '',
        author: '',
        title: '',
        content: '',
        tags: [],
        likes: 21,
        comments: [],
        views: 21,
        image: '',
    },
]

describe('TitleOfCloudTags', () => {
    it('empty filter postlist', () => {
        const returnState = { list: [] };
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        const component = render(
            <TitleOfCloudTags
                setSelectedTag={jest.fn()} />
        );
        expect(screen.getByText(/облако тегов/i)).toBeInTheDocument();
        expect(screen.queryByText(/ показать все/i)).toBeNull();
        
        expect(component).toMatchSnapshot();
    });

    it('main behavior', () => {
        const returnState = { list: postList };
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        const component = render(
            <TitleOfCloudTags
                setSelectedTag={jest.fn()} />
        );
        expect(screen.getByText(/облако тегов/i)).toBeInTheDocument();
        expect(screen.getByText(/показать все/i)).toBeInTheDocument();
        expect(mockedClearFilteredAction).toHaveBeenCalledTimes(0);
        
        userEvent.click(screen.getByText(/показать все/i));
        expect(mockedClearFilteredAction).toHaveBeenCalledTimes(1);
        expect(screen.queryByText(/ показать все/i)).toBeNull();

        expect(component).toMatchSnapshot();
    });
});