import React from 'react'
import { PostDataProps } from '../../models/PostModel'
import cl from './PostData.module.scss'


const PostData: React.FC <PostDataProps> = (
    { activePost }
): JSX.Element => {
    const { tags, title, content, author } = activePost;
    const tagsItems = tags.map(item => 
        <span 
            className={cl.root__post_author_tags}
            key={item}
        >
            {item}
        </span>);

    return (
        <div className={cl.root__post}>
            <div className={cl.root__header}>
                <div className={cl.root__post_author}>
                    {tagsItems}
                </div>
                <div className={cl.root__post_author}>
                    Автор: {author}
                </div>
            </div>
            <h2 className={cl.root__post_title}>
                {title}
            </h2>
            <div className={cl.root__post_content}>
                {content}
            </div>
        </div>
    )
};

export default PostData;