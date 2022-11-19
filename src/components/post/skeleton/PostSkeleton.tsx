import React from 'react';
import cl from './PostSkeleton.module.scss';

const PostSkeleton: React.FC = (): JSX.Element => {
    return (
        <div
            data-testid='skeleton-test'
            className={cl.root}
        >
            <div className={cl.root__wrapper}>
                <div className={cl.root__header}>
                    <div></div>
                    <div></div>
                </div>
                <h2 className={cl.root__title}></h2>
                <div className={cl.root__content}></div>
                <div className={cl.root__content}></div>
                <div className={cl.root__content}></div>
            </div>
        </div>
    )
};

export default PostSkeleton;