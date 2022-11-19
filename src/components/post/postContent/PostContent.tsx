import React from 'react';
import { PostContentProps } from '../../../models/PostModel';
import cl from './PostContent.module.scss';


const PostContent: React.FC <PostContentProps> = (
    { data }
): JSX.Element => {
    const { author, title, content, tags } = data;
    
    return (
        <div className={cl.root}>
            <div className={cl.root__header}>
                <div className={cl.root__author}>
                    {tags.map (item => 
                        <span 
                            key={item} 
                            className={cl.root__author}>
                            {item} </span>)}
                </div>
                <div className={cl.root__author}>
                    Автор: {author}
                </div>
            </div>
            <div className={cl.root__titleWrapper}>
                <h2 className={cl.root__title}>{title}</h2>
            </div>
            <div className={cl.root__content}>
                {content.slice (0, 250)}...
            </div>
        </div>
    )
};

export default PostContent;