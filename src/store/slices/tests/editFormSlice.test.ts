import reducer, { setEditForm } from '../editFormSlice';
import { StatusModel } from '../../../models/StatusModel';
import { CommentsState, CommentType } from '../../../models/CommentsModel';
import { EditFormState, TasksEnum } from '../../../models/EditFormModel';


describe('editFormSlice', () => {
    it('reducer (empty action, default state)', () => {
        const state = undefined;
        const action = { type: '' };
        const defaultState: EditFormState = {
            postID: '',
            task: TasksEnum.IDLE,
        }
        expect(reducer(state, action)).toEqual(defaultState);
    });


    it('setEditForm', () => {
        const state: EditFormState = {
            postID: '',
            task: TasksEnum.IDLE,
        }
        const action = { type: setEditForm.type, payload: {
            postID: 'zzzxxxccc1212',
            task: TasksEnum.CREATE,
        }};
        const returnedState = reducer(state, action);
        expect(returnedState.postID).toBe('zzzxxxccc1212');
        expect(returnedState.task).toBe(TasksEnum.CREATE);
    });
});