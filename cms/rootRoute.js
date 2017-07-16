import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {
  PicturesWall,
} from './src/components/antd_desiger'

import SiderHome from './src/layout/siderHome'
import SiderAbout from './src/layout/siderAbout'
import SiderContact from './src/layout/siderContact'


import Home from './src/components/test/home'
import Home1 from './src/components/test/home1'
import Home2 from './src/components/test/home2'
import About from './src/components/test/about'
import Contact from './src/components/test/contact'

const RootRoute = [
  {
    path: '/',
    exact: true,
    //sidebar: () => <SiderHome />,
    main: () => <PicturesWall />
  },
  {
    path: '/home/home2',
    main: () => <Home2 />
  },
  {
    path: '/about',
    main: () => <h2>关于我们</h2>
  },
  {
    path: '/contact',
    main: () => <h2>联系我们</h2>
  }
]


export default RootRoute;