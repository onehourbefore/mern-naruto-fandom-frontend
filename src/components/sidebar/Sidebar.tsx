import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';

import { StatusModel } from '../../models/StatusModel';
import { setEditForm } from '../../store/slices/editFormSlice';
import { TasksEnum } from '../../models/EditFormModel';
import { getAuthorization } from '../../selectors';

import SearchComponent from './search/SearchComponent';
import CloudTags from './cloudTags/CloudTags';
import LastCommentsComponent from './lastComments/LastCommentsComponent';

import cl from './Sidebar.module.scss';


const Sidebar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status: authStatus, user } = useAppSelector(getAuthorization);

    function handleSetEditForm() {
        dispatch (setEditForm ({ postID: '', task: TasksEnum.CREATE }));
        navigate ('/editform');
    }

    return (
        <div className={cl.root}>
            <div>
                <SearchComponent />
                {user.role === 'admin' && 
                <button
                    data-testid='createPostBtn-test'
                    className={cl.root__createPostBtn}
                    onClick={handleSetEditForm}
                    >
                        <div>СОЗДАТЬ</div>
                        <div>НОВЫЙ ПОСТ</div>
                </button>}
            </div>
            <CloudTags />

            {authStatus === StatusModel.SUCCESS
                && <LastCommentsComponent />}
        </div>
    )
};

export default Sidebar;