import React from 'react'
import { Link } from 'react-router-dom'

import back from '../../assets/png/back.png'
import error from '../../assets/png/error.png'

import cl from './Page404.module.scss'


const Page404: React.FC = (): JSX.Element => {
    return (
        <div className={cl.root}>
            <div className={cl.root__container}>
                <Link to="/">
                    <img 
                        className={cl.root__back}
                        src={back}
                        alt="Назад" />
                </Link>
                <img 
                    className={cl.root__error}
                    src={error}
                    alt="Ошибка" />
                <h2 className={cl.root__title}>
                    Страница не найдена!
                </h2>
            </div>
        </div>
    )
};

export default Page404;