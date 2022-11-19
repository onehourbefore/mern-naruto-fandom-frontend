import React from 'react';
import { useAppSelector } from '../../store';
import { getFilter } from '../../selectors';

import PostList from '../../components/postList/PostList';
import FilterList from '../../components/postList/FilterList';
import Sidebar from '../../components/sidebar/Sidebar';

import cl from './News.module.scss';


const News: React.FC = (): JSX.Element => {
    const { list: filterList } = useAppSelector(getFilter);

    return (
        <div className={cl.root}>
            <div className={cl.root__main}>
                <Sidebar />
                {!filterList.length 
                    ? <PostList />
                    : <FilterList posts={filterList} />}
            </div>
        </div>
    )
};

export default News;