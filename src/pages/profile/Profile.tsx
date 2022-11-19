import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';

import { getAuthorization } from '../../selectors';
import { hostName } from '../../api/apiData';
import { logout, deleteProfile } from '../../store/slices/authorizationSlice';

import cl from './Profile.module.scss';


const Profile: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(getAuthorization);

    function logoutClickHandler() {
        dispatch(logout());
        localStorage.removeItem('accessToken');
    }

    function deleteProfileHandler() {
        dispatch(deleteProfile());
        navigate('/');
    }

    return (
        <div className={cl.root}>
            <div className={cl.root__header}>
                <div className={cl.root__header_userData}>
                    <div>ИМЯ ПРОФИЛЯ</div>
                    <h2 className={cl.root__header_userData_name}>
                        {user.name}
                    </h2>
                    <div>{user.email}</div>
                    <div>Статус</div>
                    <h3 className={cl.root__header_userData_role}>
                        {user.role}
                    </h3>
                    {user.role === 'admin' &&
                        <>
                            <div>Кол-во постов: </div>
                            <h3>{user.created}</h3>
                        </>}
                    <div 
                        className={cl.root__logout}
                        onClick={logoutClickHandler}
                        >
                        <Link to="/" style={{textDecoration: 'none'}}>
                            Выйти из профиля
                        </Link>
                    </div>
                    <div 
                        className={cl.root__deleteProfile}
                        onClick={deleteProfileHandler}
                        >
                        Удалить профиль
                    </div>
                </div>
                <img 
                    className={cl.root__header_avatar} 
                    src={`${hostName}/avatars/${user.avatar}`} 
                    alt="Фото профиля" />
            </div>
        </div>
    )
};

export default Profile;