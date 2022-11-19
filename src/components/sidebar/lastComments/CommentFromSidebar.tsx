import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { formatDate } from '../../../utils/formatDate';
import { hostName } from '../../../api/apiData';
import { fetchOnePost } from '../../../store/slices/onePostSlice';
import { CommentFromSidebarProps } from '../../../models/CommentsModel';

import cl from './LastCommentsComponent.module.scss';


const CommentFromSidebar: React.FC <CommentFromSidebarProps> = (
    { comment }
): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function getPostByComment(id: string): void {
        navigate(`/news/${id}`);
        dispatch(fetchOnePost (id));
    }

    return (
        <div
            data-testid="commentFromSidebar-test"
            className={cl.root__comment}
            onClick={() => getPostByComment(comment.postID)}
        >
            <div className={cl.root__comment_avatar}>
                <img 
                    className={cl.root__comment_avatarIcon} 
                    src={`${hostName}/avatars/${comment.avatar}`} 
                    alt="Аватар" />
            </div>
            <div className={cl.root__comment_content}>
                <div className={cl.root__comment_header}>
                    <div>
                        <h3 className={cl.root__comment_header_title}>
                            {comment.name}
                        </h3>
                        <div className={cl.root__comment_header_email}>
                            {comment.email}
                        </div>
                    </div>
                    <div>
                        <div className={cl.root__comment_header_date}>
                            <div>{formatDate (comment.date)[0]}</div>
                            <div>{formatDate (comment.date)[1]}</div>
                        </div>
                    </div>
                </div>
                <div className={cl.root__comment_body}>
                    {comment.body.length < 40 
                        ? comment.body
                        : `${comment.body.slice (0, 41)}...`}
                </div>
            </div>
        </div>
    )
};

export default CommentFromSidebar;