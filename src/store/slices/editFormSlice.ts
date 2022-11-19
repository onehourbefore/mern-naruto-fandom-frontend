import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditFormState, TasksEnum } from '../../models/EditFormModel';

const initialState: EditFormState = {
    postID: '',
    task: TasksEnum.IDLE,
}

export const editFormSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setEditForm: (state, action: PayloadAction<EditFormState>) => {
            const { postID, task } = action.payload;
            state.postID = postID;
            state.task = task;
        }
    }
})

const { actions, reducer } = editFormSlice;
export default reducer;
export const { setEditForm } = actions;