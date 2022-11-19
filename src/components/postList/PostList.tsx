import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/index';

import { clearAll, clearDeleted, fetchPosts } from '../../store/slices/postsSlice';
import { getPosts } from '../../selectors';
import { useScroll } from '../../hooks/useScroll';
import { StatusModel } from '../../models/StatusModel';
import { getCountOfPages } from '../../utils/getCountOfPages';

import PostSkeleton from '../post/skeleton/PostSkeleton';
import Post from '../post/Post';

import cl from './PostList.module.scss';


const PostList: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const limit = 2;
    const { all, count, deleted } = useAppSelector(getPosts);
    const [page, setPage] = React.useState(1);
    const maxCountOfPages = getCountOfPages(count.count, limit);
    const childRef = React.useRef () as React.RefObject <HTMLDivElement>;

    useScroll(childRef.current, all.status, page, () => {
        if(count.count !== 0 && page <= maxCountOfPages) {
            dispatch (fetchPosts({limit, page}));
            setPage(page => page + 1);
        }
    });

    React.useEffect(() => {
        if(deleted.post) {
            dispatch(clearDeleted());
        }
        dispatch(fetchPosts({ limit, page: 1 }));
        setPage(2);

        return () => {
            dispatch(clearAll());
        }
    }, [deleted.post]);

    if(deleted.status === StatusModel.LOADING) {
        return <div className={cl.root}>
            {[...Array(2)].map((_, i) => <PostSkeleton key={i} />)}
        </div>
    };

    return (
        <div
            data-testid='postlist-test'
            className={cl.root}
        >
            {all.posts.map ((post) => 
                    <Post key={post._id} post={post} />)}
            {all.status === StatusModel.LOADING
                && [...Array(2)].map((_, i) => <PostSkeleton key={i} />)}
            <div 
                ref={childRef} 
                style={{height: '5px', background: 'transparent'}}>
            </div>
        </div>
    )
};

export default PostList;