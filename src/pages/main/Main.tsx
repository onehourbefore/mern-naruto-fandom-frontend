import React from 'react';
import { Link } from 'react-router-dom';

import narutoMain from '../../assets/png/narutoMain.png';
import stars from '../../assets/png/stars.png';
import starsTwo from '../../assets/png/stars2.png';
import vk from '../../assets/png/social/vk.png';
import instagram from '../../assets/png/social/instagram.png';
import facebook from '../../assets/png/social/facebook.png';

import cl from './Main.module.scss';


const Main: React.FC = (): JSX.Element => {
    return (
        <div className={cl.root}>
            <div className={cl.root__container}>
                <div className={cl.root__wrapper}>
                    <div className={cl.root__article}>
                        <h2 className={cl.root__article_title}>
                            Naruto Fandom
                        </h2>
                        <div className={cl.root__article_content}>
                            Самое интересное из вселенной Наруто
                        </div>
                        <Link
                            data-testid="openBtn-test"
                            to="/news"
                            style={{ textDecoration: 'none'}}
                        >
                            <button className={cl.root__article_btn}>
                                ОТКРЫТЬ
                            </button>
                        </Link>
                    </div>
                    <div className={cl.root__imgsWrapper}>
                        <img 
                            className={cl.root__imgsWrapper_narutoPng}
                            src={narutoMain}
                            alt="naruto" />
                        <img 
                            className={cl.root__imgsWrapper_stars}
                            src={stars}
                            alt="first stars" />
                        <img 
                            className={cl.root__imgsWrapper_starsTwo}
                            src={starsTwo}
                            alt="second stars" />
                    </div>
                </div>
                <div className={cl.root__social}>
                    <div className={cl.root__social_wrapperIcon}>
                        <img 
                            className={cl.root__social_icon}
                            src={instagram}
                            alt="Instagram" />
                    </div>
                    <div className={cl.root__social_wrapperIcon}>
                        <img 
                            className={cl.root__social_icon}
                            src={facebook}
                            alt="Facebook" />
                    </div>
                    <div className={cl.root__social_wrapperIcon}>
                        <img 
                            className={cl.root__social_icon}
                            src={vk}
                            alt="VK" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Main;