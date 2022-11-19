import React from 'react';
import { Link } from 'react-router-dom';
import error2 from '../../assets/png/error2.png';
import back from '../../assets/png/back.png';

import cl from './Error.module.scss';


const Error: React.FC = (): JSX.Element => {
    return (
        <div
            data-testid="error"
            className={cl.root}
        >
            <div className={cl.root__back}>
                <Link to="/news">
                    <img
                        className={cl.root__back_img}
                        src={back}
                        alt="Назад"
                    />
                </Link>
            </div>
            <img 
                className={cl.root__error}
                src={error2}
                alt="Ошибка"
            />
        </div>
    )
};

export default Error;