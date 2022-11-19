import React from 'react';

import { PostType } from '../../models/PostModel';
import Post from '../post/Post';

import cl from './PostList.module.scss';


type FilterListProps = {
    posts: PostType [],
}

const FilterList: React.FC <FilterListProps> = (
    { posts }
): JSX.Element => {
    return (
        <div
            data-testid='filterlist-test'
            className={cl.root}
        >
            {posts.map ((post) => 
                <Post key={post._id} post={post} />)}
        </div>
    )
}

export default FilterList