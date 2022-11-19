import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

import { getAuthorization } from '../../selectors';
import { removeComment } from '../../store/slices/onePostSlice';
import { hostName } from '../../api/apiData';
import { formatDate } from '../../utils/formatDate';
import { CommentProps } from '../../models/CommentsModel';

import deleteIcon from '../../assets/png/deleteIcon.png';
import avatarLogo from '../../assets/png/avatarLogo.png';

import cl from './Comment.module.scss';


const Comment: React.FC <CommentProps> = (
    {
        data,
        postID
    }
): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(getAuthorization);
    const { _id, name, email, body, avatar, date } = data;
    const [newDate, time] = formatDate(date);
    
    function deleteCommentHandler() {
        postID && dispatch (removeComment({ postID, commentID: _id }));
    }

    return (
        <div
            data-testid='comment'
            className={cl.root}
        >
            {user.role === 'admin' && 
                <img 
                    className={cl.root__deleteBtn} 
                    src={deleteIcon} 
                    alt="Удалить комментарий"
                    onClick={deleteCommentHandler} />}
            <div className={cl.root__avatar}>
                <img
                    className={cl.root__avatar_img}
                    src={avatar 
                            ? `${hostName}/avatars/${avatar}` 
                            : avatarLogo}
                    alt="Аватар"
                />
            </div>
            <div className={cl.root__content}>
                <div className={cl.root__header}>
                    <h3 className={cl.root__header_author}>
                        {name}
                        <div className={cl.root__header_email}>{email}</div>
                    </h3>
                    <div
                        data-testid='commentDate'
                        className={cl.root__header_date}
                        >{newDate}<br />{time}
                    </div>
                </div>
                <div className={cl.root__body}>{body}</div>
            </div>
        </div>
    )
};

export default Comment;