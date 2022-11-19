import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/index';
import { getFilter } from '../../../selectors';
import { findPosts, clearSearchStatus } from '../../../store/slices/filterSlice';
import searchIcon from '../../../assets/png/search.png';
import clearIcon from '../../../assets/png/clear.png';

import cl from './SearchComponent.module.scss';


const SearchComponent: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { searchStatus } = useAppSelector(getFilter);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const debouncedTimer = React.useRef<NodeJS.Timeout>();

    function sendSearchQuery(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value);
        if (debouncedTimer.current) {
            clearTimeout(debouncedTimer.current);
        }
        debouncedTimer.current = setTimeout(() => {
            dispatch(findPosts({
                type: '_query', 
                payload: e.target.value.toUpperCase(),
            }));
            setTimeout(() => {
                dispatch(clearSearchStatus());
            }, 3000);
        }, 1000)
    };

    return (
        <div className={cl.root}>
            <div className={cl.root__search}>
                <div className={cl.root__searchWrapper}>
                    <img 
                        className={cl.root__search_icon}
                        src={searchIcon} 
                        alt="Поиск" />
                    <input 
                        className={cl.root__search_input} 
                        id="searchInput" 
                        type="text" 
                        placeholder="Поиск по блогу..."
                        value={searchValue}
                        onChange={sendSearchQuery}
                    />
                </div>

                {searchValue && 
                    <button
                        data-testid="clearBtn-test"
                        className={cl.root__search_btn}
                        onClick={() => setSearchValue('')}
                    >
                        <img 
                            className={cl.root__search_btn_img}
                            src={clearIcon} 
                            alt="Очистить" />
                    </button>}
            </div>

            {searchStatus === "error" &&
                <div className={cl.root__notFoundStatus}>
                    Ничего не найдено
                </div>}
        </div>
    )
};

export default SearchComponent;