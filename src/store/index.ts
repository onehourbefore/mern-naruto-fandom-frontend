import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import posts from './slices/postsSlice';
import filter from './slices/filterSlice';
import onePost from './slices/onePostSlice';
import registration from './slices/registrationSlice';
import authorization from './slices/authorizationSlice';
import experts from './slices/expertSlice';
import comments from './slices/commentSlice';
import editForm from './slices/editFormSlice';

export const rootReducer = combineReducers ({
    posts,
    filter,
    onePost,
    registration,
    authorization,
    experts,
    comments,
    editForm,
});

export const store = configureStore ({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware (),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType <typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;