import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

import { getAuthorization } from '../../selectors';
import { FeedbackPanelProps } from '../../models/PostModel';
import { addLike, removeLike } from '../../store/slices/onePostSlice';
import { checkIsLiked } from './utils/checkIsLiked';

import viewsIcon from '../../assets/png/view.png';
import likesIcon from '../../assets/png/like.png';
import likedIcon from '../../assets/png/liked.png';
import commentsIcon from '../../assets/png/comments.png';

import cl from './FeedbackPanel.module.scss';


const FeedbackPanel: React.FC <FeedbackPanelProps> = (
    {
        activePost,
        id
    }
): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(getAuthorization);
    const [flagLike, setFlagLike] = React.useState(false);

    function likeClickHandler() {
        if(flagLike && id) {
            setFlagLike(false);
            dispatch(removeLike(id));
            return;
        }
        if(activePost && id) {
            setFlagLike(true);
            dispatch(addLike(id));
            return;
        }
    }

    React.useEffect(() => {
        setFlagLike(checkIsLiked(user.liked, activePost._id));
    }, [])

    return (
        <div
            data-testid='feedbackPanel'
            className={cl.root}
        >
            <div className={cl.root__item}>
                <img
                    className={cl.root__item_img}
                    src={viewsIcon} alt="Просмотры" />
                <span 
                    className={cl.root__item_count}>
                    {activePost.views}
                </span>
            </div>
            <div
                className={cl.root__item}
                onClick={likeClickHandler}
            >
                <img
                    className={[cl.root__item_img, cl.root_likeImg].join(' ')}
                    src={flagLike ? likedIcon : likesIcon}
                    alt="Лайки" />
                <span
                    className={cl.root__item_count}
                    style={{color: flagLike
                        ? 'rgb(50, 50, 50)'
                        : 'rgba(255, 255, 255, 0.5)'}}>
                    {activePost.likes}
                </span>
            </div>
            <div className={cl.root__item}>
                <img
                    className={cl.root__item_img}
                    src={commentsIcon} 
                    alt="Комментарии" />
                <span
                    className={cl.root__item_count}>
                    {activePost.comments.length}
                </span>
            </div>
        </div>
    )
};

export default FeedbackPanel;