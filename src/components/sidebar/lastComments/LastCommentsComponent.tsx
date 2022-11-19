import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getComments, getPostsAll } from '../../../selectors';
import { fetchComments } from '../../../store/slices/commentSlice';
import { CommentType } from '../../../models/CommentsModel';
import { StatusModel } from '../../../models/StatusModel';
import CommentFromSidebar from './CommentFromSidebar';
import Spinner from '../../spinner/Spinner';

import cl from './LastCommentsComponent.module.scss';


const LastCommentsComponent: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { posts } = useAppSelector(getPostsAll);
    const { comments, status } = useAppSelector(getComments);
    const lastComments = showLastComments();

    function showLastComments(): CommentType[] {
        let lastCommentaries: CommentType[] = [];
        if (comments.length <= 3) {
            for (let i = comments.length - 1; i >= 0; i--) {
                lastCommentaries.push(comments[i]);
            }
            return lastCommentaries;
        }
        for (let i = comments.length - 1; i > comments.length - 4; i--) {
            lastCommentaries.push(comments[i]);
        }
        return lastCommentaries;
    };

    React.useEffect(() => {
        if (posts.length) {
            dispatch(fetchComments());
        }
    }, [posts.length]);

    return (
        <div className={cl.root}>
            {status === StatusModel.LOADING && 
                <Spinner mt='10px' />}

            {lastComments.length !== 0 && 
                <h3 className={cl.root__title}>
                    ПОСЛЕДНИЕ КОММЕНТАРИИ
                </h3>}
                
            {lastComments.map(comment => 
                <CommentFromSidebar 
                    key={comment._id}
                    comment={comment}
                />)}
        </div>
    )
};

export default LastCommentsComponent;