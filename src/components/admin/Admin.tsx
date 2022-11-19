import React from 'react';
import { hostName } from '../../api/apiData';

import cl from './Admin.module.scss';


type AdminProps = {
    name: string,
    email: string,
    avatar: string,
    created: number
};

const Admin: React.FC <AdminProps> = (
    {
        name,
        email,
        avatar,
        created
    }
): JSX.Element => {
    return (
        <div data-testid="admin-item" className={cl.root}>
            <div className={cl.root__avatar}>
                <img 
                    className={cl.root__avatar_img}
                    src={`${hostName}/avatars/${avatar}`}
                    alt="Аватар"
                />
            </div>
            <div className={cl.root__content}>
                <h2 className={cl.root__content_title}>{name}</h2>
                <div className={cl.root__content_email}>
                    <a 
                        data-testid={email}
                        className={cl.root__content_email_link} 
                        href={`mailto:${email}`}
                        >{email}
                    </a>
                </div>
                <div className={cl.root__content_created}>
                    Созданных постов: {created}
                </div>
            </div>
        </div>
    )
};

export default Admin;