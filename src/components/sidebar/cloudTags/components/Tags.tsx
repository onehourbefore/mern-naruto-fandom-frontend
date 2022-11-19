import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { findPosts } from '../../../../store/slices/filterSlice';
import { getFilter } from '../../../../selectors';
import cl from '../CloudTags.module.scss';


type TagsProps = {
    selectedTag: string,
    setSelectedTag: (tag: string) => void,
};

const Tags: React.FC <TagsProps> = (
    {
        selectedTag,
        setSelectedTag,
    }
): JSX.Element => {
    const dispatch = useAppDispatch();
    const { tags } = useAppSelector(getFilter);

    function clickTagHandler(tag: string): void {
        setSelectedTag(tag);
        dispatch(findPosts({
            type: '_tag', 
            payload: tag.slice(1),
        }));
    };

    return (
        <React.Fragment>
            {tags.map ((tag) => 
                <span 
                    key={tag} 
                    className={
                        selectedTag && selectedTag === tag 
                        ? cl.root__tag_active 
                        : cl.root__tag} 
                    onClick={() => clickTagHandler(tag)}>
                    {tag}
                </span>)}
        </React.Fragment>
    );
};

export default Tags;