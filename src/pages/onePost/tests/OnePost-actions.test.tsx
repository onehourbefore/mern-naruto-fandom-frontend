import * as routerHooks from 'react-router';
import * as reduxHooks from '../../../store';
import * as actions from '../../../store/slices/onePostSlice';
import { renderWithProviders } from "../../../utils/test-utils/test-utils";
import OnePost from "../OnePost";

const mockedWindowScrollTo = jest.spyOn(window, 'scrollTo');
const mockedUseParams = jest.spyOn(routerHooks, 'useParams');
const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedFetchOnePostAction = jest.spyOn(actions, 'fetchOnePost');


describe('OnePost', () => {
    it('fetchOnePostAction call', () => {
        const postID = 'zzzxxxccc1212';
        mockedUseParams.mockReturnValue({ id: postID });
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <OnePost /> });

        expect(mockedFetchOnePostAction).toHaveBeenCalledTimes(1);
        expect(mockedFetchOnePostAction).toHaveBeenCalledWith(postID);
    });
});