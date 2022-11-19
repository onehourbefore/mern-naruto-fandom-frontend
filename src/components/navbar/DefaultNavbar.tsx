import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { hostName } from '../../api/apiData';
import { StatusModel } from '../../models/StatusModel';
import { getAuthorization } from '../../selectors';

import navLogo from '../../assets/png/navLogo.png';
import cl from './Navbar.module.scss';


const DefaultNavbar: React.FC = (): JSX.Element => {
    const { pathname } = useLocation();
    const { user, status } = useAppSelector(getAuthorization);
    
    function linkClasses(path: string) {
        return pathname === path 
            ? [cl.root__link, cl.root__activeLink].join (' ') 
            : cl.root__link;
    }

    return (
        <div className={cl.root__container}>
            <Link className={cl.root__linkLogo} to="/">
                <div className={cl.root__logo}>
                    <img
                        className={cl.root__logo_img} 
                        src={navLogo} 
                        alt="Логотип" />
                </div>
            </Link>
            <div className={cl.root__linksWrapper} >
                <Link
                    className={linkClasses('/')} 
                    to="/">ГЛАВНАЯ</Link>
                <Link
                    className={linkClasses('/news')} 
                    to="/news">НОВОСТИ</Link>
                <Link
                    className={linkClasses('/experts')} 
                    to="/experts">АВТОРЫ</Link>
                <Link 
                    className={linkClasses('/about')} 
                    to="/about">О НАС</Link>
            </div>
            {status === StatusModel.SUCCESS
            ? <div className={cl.root__signBtns}>
                <Link to="/profile">
                    <button
                        className={cl.root__signIn} 
                        style={{fontWeight: 800}}
                        >
                        <div className={cl.root__userData}>
                            <div>{user.name}</div>
                            <img 
                                className={cl.root__userData_avatar} 
                                src={`${hostName}/avatars/${user.avatar}`} 
                                alt="Аватар" />
                        </div>
                    </button>
                </Link>
            </div>
            : <div className={cl.root__signBtns}>
                <Link to="/login">
                    <button className={cl.root__signIn}>
                        ВОЙТИ
                    </button>
                </Link>
                <Link to="/registration">
                    <button className={cl.root__signUp}>
                        РЕГИСТРАЦИЯ
                    </button>
                </Link>
            </div>}
        </div>
    );
};

export default DefaultNavbar;