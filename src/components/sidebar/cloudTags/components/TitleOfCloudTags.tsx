import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { clearFiltered } from '../../../../store/slices/filterSlice';
import { getFilter } from '../../../../selectors';
import cl from '../CloudTags.module.scss';


type TitleOfCloudTagsProps = {
    setSelectedTag: (tag: string) => void,
};

const TitleOfCloudTags: React.FC <TitleOfCloudTagsProps> = (
    { setSelectedTag }
): JSX.Element => {
    const dispatch = useAppDispatch();
    const { list } = useAppSelector(getFilter);

    function showAllHandler(): void {
        setSelectedTag('');
        dispatch(clearFiltered());
    };

    return (
        <React.Fragment>
            {!list.length 
                ? <h3 className={cl.root__title}>ОБЛАКО ТЕГОВ</h3>
                : <h3 className={cl.root__title}>
                    ОБЛАКО ТЕГОВ |
                    <span 
                        className={cl.root__title_showAll} 
                        onClick={showAllHandler}> Показать все</span>
                </h3>}
        </React.Fragment>
    );
};

export default TitleOfCloudTags;