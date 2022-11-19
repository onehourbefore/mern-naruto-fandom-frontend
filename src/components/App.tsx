import React from 'react'
import { useAppDispatch } from '../store/index'
import { getCountOfPosts } from '../store/slices/postsSlice'
import { refresh } from '../store/slices/authorizationSlice'

import Navbar from './navbar/Navbar'
import AppRouter from './AppRouter'

import './App.scss'


const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  
  React.useEffect (() => {
    dispatch(refresh());
    dispatch(getCountOfPosts());
  }, [])

  return (
    <div className="app">
      <Navbar />
      <AppRouter />
    </div>
  )
};

export default App;
