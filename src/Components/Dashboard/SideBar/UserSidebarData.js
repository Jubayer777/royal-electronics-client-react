import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const UserSidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Shop',
    path: '/shop',
    icon: <FaIcons.FaStore />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/dashboard',
    icon: <FaIcons.FaList />,
    cName: 'nav-text'
  }
];