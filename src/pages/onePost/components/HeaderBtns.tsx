import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { StatusModel } from '../../../models/StatusModel';
import { TasksEnum } from '../../../models/EditFormModel';
import { setEditForm } from '../../../store/slices/editFormSlice';
import { clearCreated, clearUpdated } from '../../../store/slices/postsSlice';

import backIcon from '../../../assets/png/back.png';
import editIcon from '../../../assets/png/edit.png';

import cl from '../OnePost.module.scss';


type HeaderBtnsProps = {
    postID: string | undefined,
    authStatus: StatusModel,
    userRole: string,
};

const HeaderBtns: React.FC <HeaderBtnsProps> = (
    {
        postID,
        authStatus,
        userRole,
    }
): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleSetEditForm() {
        if(postID) {
            dispatch(clearCreated());
            dispatch(clearUpdated());
            dispatch(setEditForm({
                postID: postID, 
                task: TasksEnum.UPDATE,
            }))
            navigate ('/editform');
        }
    }

    return (
        <div
            data-testid='headerBtns'
            className={cl.root__header}
        >
            <Link to="/news">
                <img
                    className={cl.root__header_back}
                    src={backIcon}
                    alt="Назад к ленте постов" />
            </Link>
            {authStatus === StatusModel.SUCCESS && userRole === 'admin' && 
                <img 
                    className={cl.root__header_edit} 
                    src={editIcon} 
                    alt="Редактировать"
                    onClick={handleSetEditForm} />}
        </div>
    );
};

export default HeaderBtns;