import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../store';
import { StatusModel } from '../../models/StatusModel';
import { hostName } from '../../api/apiData';
import { getAuthorization } from '../../selectors';

import backIcon from '../../assets/png/back.png';
import navLogo from '../../assets/png/navLogo.png';

import cl from './Navbar.module.scss';


const Hamburger: React.FC = (): JSX.Element => {
    const { user, status } = useAppSelector(getAuthorization);
    const [menuVision, setMenuVision] = React.useState(false);

    function makeVisible() {
        setMenuVision (prev => !prev);
    }

    return (
        <div className={cl.root__hamburger}>
                <Link className={cl.root__linkLogo} to="/">
                    <div className={cl.root__logo}>
                        <img 
                            className={cl.root__logo_img}  
                            src={navLogo} 
                            alt="Логотип" />
                    </div>
                </Link>

                <div className={cl.root__hamburger_signLinks}>
                    {status === StatusModel.SUCCESS
                    ? <div className={cl.root__signBtns}>
                        <Link to="/profile">
                            <button 
                                className={cl.root__signIn} 
                                style={{fontWeight: 800}}
                            >
                                <div className={cl.root__userData}>
                                    <img
                                        className={cl.root__userData_avatar}
                                        src={`${hostName}/avatars/${user.avatar}`}
                                        alt="Аватар"
                                    />
                                    <div>{user.name}</div>
                                </div>
                            </button>
                        </Link>
                    </div>
                    : <div className={cl.root__signBtns}>
                        <Link to="/login">
                            <button className={cl.root__signIn}>
                                ВОЙТИ</button>
                        </Link>
                        <Link to="/registration">
                            <button className={cl.root__signUp}>
                                РЕГИСТРАЦИЯ</button>
                        </Link>
                    </div>}
                </div>

                <div
                    data-testid="hamburger" 
                    className={cl.root__hamburger_icon} 
                    onClick={makeVisible}
                    >
                    <div className={cl.root__hamburger_icon_item}></div>
                    <div className={cl.root__hamburger_icon_item}></div>
                    <div className={cl.root__hamburger_icon_item}></div>
                </div>

                <div 
                    data-testid="menu"
                    className={menuVision 
                        ? cl.root__visible 
                        : cl.root__noVisible
                }>
                    <div
                        className={cl.root__link_close}
                        onClick={makeVisible}>
                        <img 
                            className={cl.root__link_close_img} 
                            src={backIcon} 
                            alt="Закрыть" />
                    </div>
                    <Link
                        className={cl.root__link}
                        onClick={makeVisible}
                        to="/">ГЛАВНАЯ</Link>
                    <Link
                        className={cl.root__link}
                        onClick={makeVisible}
                        to="/news">НОВОСТИ</Link>
                    <Link
                        className={cl.root__link}
                        onClick={makeVisible}
                        to="/experts">АВТОРЫ</Link>
                    <Link
                        className={cl.root__link}
                        onClick={makeVisible}
                        to="/about">О НАС</Link>
                </div>
            </div>
    )
};

export default Hamburger;