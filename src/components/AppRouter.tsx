import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../store/index';
import { StatusModel } from '../models/StatusModel';
import { getAuthorization } from '../selectors';

import Main from '../pages/main/Main';
import News from '../pages/news/News';
import About from '../pages/about/About';
import Experts from '../pages/experts/Experts';
import OnePost from '../pages/onePost/OnePost';
import Login from '../pages/login/Login';
import Registration from '../pages/login/registration/Registration';
import Profile from '../pages/profile/Profile';
import EditForm from '../pages/editForm/EditForm';
import Page404 from '../pages/page404/Page404';


const AppRouter: React.FC = (): JSX.Element => {
    const { status } = useAppSelector(getAuthorization);

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/news/:id" element={<OnePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/editform" element={<EditForm />} />
            <Route 
                path="/profile" 
                element={status === StatusModel.SUCCESS
                    ? <Profile /> 
                    : <Page404 />}
                />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
};

export default AppRouter;