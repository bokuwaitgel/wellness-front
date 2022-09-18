import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'List',
    path: '/admin',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Day control',
    path: '/admin/day',
    icon: <IoIcons.IoIosAlarm />,
    cName: 'nav-text'
  }
];
