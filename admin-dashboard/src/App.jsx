// src/App.jsx
import React, { createContext, useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './pages/Users';
import Posts from './pages/Posts';
import Comments from './pages/Comments';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import UserAuthForm from './pages/UserAuthFormDash';
import DashboardOverView from './pages/DashboardOverView';

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState(null); // Initialized as null

  const routes = useRoutes([

    { path: "/signup", element: <UserAuthForm type="sign-up" /> },
    {
      
      path: '/admin',
      
      element: (
        
        <UserContext.Provider value={{ userAuth, setUserAuth }}>
        
          <Dashboard />
        </UserContext.Provider>
      ),
      
      children: [
    

        { path: '', element: <Navigate to="/admin/overview" replace /> },

        { path: 'overview', element: <DashboardOverView /> },
        { path: 'users', element: <Users /> },
        { path: 'posts', element: <Posts /> },
        { path: 'comments', element: <Comments /> },
        { path: 'categories', element: <Categories /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    { path: '*', element: <Navigate to="/admin" replace /> },
  ]);

  return routes;
};

export default App;
