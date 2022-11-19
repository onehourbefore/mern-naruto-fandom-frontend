import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOnePost } from '../../store/slices/onePostSlice';
import { hostName } from '../../api/apiData';
import { StatusModel } from '../../models/StatusModel';
import { getOnepostActive, getAuthorization } from '../../selectors';

import Error from '../../components/error/Error';
import Spinner from '../../components/spinner/Spinner';
import HeaderBtns from './components/HeaderBtns';
import PostData from '../../components/postData/PostData';
import FeedbackPanel from '../../components/feedbackPanel/FeedbackPanel';
import Comment from '../../components/comment/Comment';
import CommentForm from '../../components/comment/commentForm/CommentForm';

import cl from './OnePost.module.scss';


const OnePost: React.FC = (): JSX.Element => {
    const { id: postID } = useParams();
    const dispatch = useAppDispatch();
    const { post, status: postStatus } = useAppSelector(getOnepostActive);
    const { user, status: authStatus } = useAppSelector(getAuthorization);
    const [commentFormVisible, setCommentFormVisible] = React.useState(false);

    React.useEffect(() => {
        if(postID && post === null) {
            dispatch(fetchOnePost(postID));
            return;
        }
    }, [post]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className={cl.container}>
            <React.Fragment>
            {postStatus === StatusModel.LOADING && <Spinner />}
            {postStatus === StatusModel.ERROR && <Error />}
            {postStatus === StatusModel.SUCCESS && post &&
            <div className={cl.root}>
                <HeaderBtns
                    postID={postID}
                    authStatus={authStatus}
                    userRole={user.role}
                />
                
                {post.image && 
                <div className={cl.root__postImage}>
                    <img 
                        className={cl.root__postImage_img}
                        src={`${hostName}/postImages/${post.image}`}
                        alt="Фон" />
                </div>}

                <PostData activePost={post} />

                {authStatus === StatusModel.SUCCESS && 
                    <FeedbackPanel 
                        activePost={post}
                        id={postID} />}
    
                {authStatus === StatusModel.SUCCESS &&
                    <div className={cl.root__commentForm}>
                        <div 
                            className={cl.root__commentForm_title}
                            onClick={() => setCommentFormVisible(!commentFormVisible)}
                        >
                            - Добавить комментарий -
                        </div>
                    </div>}

                {commentFormVisible &&
                    <CommentForm setVisible={setCommentFormVisible}/>}

                {authStatus === StatusModel.SUCCESS &&
                    post.comments.map ((comment, i) => 
                        <Comment
                            key={i}
                            data={comment}
                            postID={postID}
                            commentIndex={i}
                        />)}
            </div>}
            </React.Fragment>
        </div>
    );
};

export default OnePost;