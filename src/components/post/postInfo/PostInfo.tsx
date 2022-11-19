import React from 'react';
import { PostInfoProps } from '../../../models/PostModel';
import likesIcon from '../../../assets/png/like.png';
import viewsIcon from '../../../assets/png/view.png';
import commentsIcon from '../../../assets/png/comments.png';
import cl from './PostInfo.module.scss';


const PostInfo: React.FC <PostInfoProps> = (
    { data }
): JSX.Element => {
    const { likes, comments, views } = data;
    return (
        <div className={cl.root}>
            <div className={cl.root__item}>
                <img
                    className={cl.root__item_img}
                    src={viewsIcon}
                    alt="Просмотры" />
                <span 
                    className={cl.root__item_count}>
                        {views}
                </span>
            </div>
            <div className={cl.root__item}>
                <img
                    className={cl.root__item_img}
                    src={likesIcon}
                    alt="Лайки" />
                <span 
                    className={cl.root__item_count}>
                        {likes}
                </span>
            </div>
            <div className={cl.root__item}>
                <img
                    className={cl.root__item_img}
                    src={commentsIcon}
                    alt="Комментарии" />
                <span 
                    className={cl.root__item_count}>
                        {comments.length}
                </span>
            </div>
        </div>
    )
};

export default PostInfo;