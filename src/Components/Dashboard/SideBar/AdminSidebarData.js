import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


export const AdminSidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Product',
    path: '/dashboard',
    icon: <FaIcons.FaTasks/>,
    cName: 'nav-text'
  },
  {
    title: 'Manage Category',
    path: '/manageCategory',
    icon: <FaIcons.FaTasks/>,
    cName: 'nav-text'
  },
  {
    title: 'Manage Brand',
    path: '/manageBrand',
    icon: <FaIcons.FaTasks/>,
    cName: 'nav-text'
  },
  {
    title: 'Manage Admin',
    path: '/manageAdmin',
    icon: <FaIcons.FaUserPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Order',
    path: '/manageOrder',
    icon: <FaIcons.FaTasks />,
    cName: 'nav-text'
  }
];