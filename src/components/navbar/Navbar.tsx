import React from 'react';
import DefaultNavbar from './DefaultNavbar';
import Hamburger from './Hamburger';

import cl from './Navbar.module.scss';


const Navbar: React.FC = (): JSX.Element => {
    return (
        <div className={cl.root}>
            <DefaultNavbar />
            <Hamburger />
        </div>
    )
};

export default Navbar;