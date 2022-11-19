import { render } from '@testing-library/react';
import * as reduxHooks from "../../../store";
import { StatusModel } from '../../../models/StatusModel';
import * as actions from '../../../store/slices/expertSlice';
import { ExpertsState } from '../../../models/ExpertsModel';
import Experts from '../Experts';


const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const returnState: ExpertsState = {
    experts: [
        {
            avatar: 'jakeAvatar.img',
            email: 'jake@gmail.com',
            name: 'Jake',
            created: 23
        },
        {
            avatar: 'robAvatar.img',
            email: 'rob@gmail.com',
            name: 'Rob',
            created: 8
        }
    ],
    status: StatusModel.IDLE
};

describe ('Experts-actions', () => {
    it ('fetchExpertsAction call', () => {
        const dispatch = jest.fn ();
        const mockedFetchExperts = jest.spyOn (actions, 'fetchExperts');
        mockedUseAppSelector.mockReturnValue (returnState);
        mockedUseAppDispatch.mockReturnValue (dispatch);
        
        render (<Experts />);
        expect (dispatch).toHaveBeenCalledTimes (1);
        expect (mockedFetchExperts).toHaveBeenCalledTimes (1);
    });
});