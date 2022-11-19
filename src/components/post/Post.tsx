import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { getAuthorization } from '../../selectors';
import { hostName } from '../../api/apiData';
import { clearActivePost } from '../../store/slices/onePostSlice';
import { deletePost } from '../../store/slices/postsSlice';
import { StatusModel } from '../../models/StatusModel';
import { PostProps } from '../../models/PostModel';

import PostContent from './postContent/PostContent';
import PostInfo from './postInfo/PostInfo';
import deleteIcon from '../../assets/png/deleteIcon.png';

import cl from './Post.module.scss';


const Post: React.FC <PostProps> = (
    { post }
): JSX.Element => {
    const { _id, author, title, content, image, tags, likes, comments, views } = post;
    const navigate = useNavigate();
    const imgPath = `${hostName}/postImages/${image}`;
    const dispatch = useAppDispatch();
    const { user, status } = useAppSelector(getAuthorization);

    function getOnePost(id: string) {
        navigate(`/news/${id}`);
        dispatch(clearActivePost ());
    }

    function deletePostHandler(e: any) {
        e.stopPropagation();
        dispatch(deletePost (_id));
    }

    return (
        <div
            data-testid="post-root"
            className={cl.root} style={{
                background: `linear-gradient(180deg, 
                    rgba(10, 10, 10, 0.8), rgba(0, 0, 0, 1)), 
                    url(${imgPath}) center center/cover no-repeat`}}
            onClick={() => getOnePost (_id)}
            >
            {status === StatusModel.SUCCESS && user.role === 'admin' &&
                <div className={cl.root__deleteBtn}>
                    <img
                        className={cl.root__deleteBtn_img}
                        src={deleteIcon}
                        alt="Удалить пост"
                        onClick={deletePostHandler} />
                </div>}

            <div className={cl.root__mainWrapper}>
                <PostContent data={{ author, title, content, tags }} />

                {status === StatusModel.SUCCESS &&
                    <PostInfo data={{likes, comments, views}} />}
            </div>
        </div>
    )
};

export default Post;