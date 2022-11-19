import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getAllTags } from '../../../store/slices/filterSlice';
import { StatusModel } from '../../../models/StatusModel';
import { getFilter, getPostsAll } from '../../../selectors';
import Spinner from '../../spinner/Spinner';
import TitleOfCloudTags from './components/TitleOfCloudTags';
import Tags from './components/Tags';

import cl from './CloudTags.module.scss';


const CloudTags: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { posts } = useAppSelector(getPostsAll);
    const { fetchStatus } = useAppSelector(getFilter);
    const [selectedTag, setSelectedTag] = React.useState('');

    React.useEffect(() => {
        if (posts.length)  {
            dispatch(getAllTags());
        }
    }, [posts]);

    return (
        <div className={cl.root}>
            <TitleOfCloudTags
                setSelectedTag={setSelectedTag}
            />
            <div className={cl.root__body}>
                {fetchStatus === StatusModel.LOADING
                ? <Spinner mt='0px' />
                : <Tags
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                />}
            </div>
        </div>
    )
};

export default CloudTags;