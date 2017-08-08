import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {LayoutCustomize} from './src/__share'

import {
  PicturesWall,
} from './src/components/antd_desiger'




import Home from './src/components/test/home'
import Home1 from './src/components/test/home1'
import Home2 from './src/components/test/home2'
import About from './src/components/test/about'
import Contact from './src/components/test/contact'

const RootRoute = [
  {
    path: '/',
    exact: true,

    main: () => <Home1 />
  },
  {
    path: '/home1/home03',
    main: () =><div>home3</div>
  }, 
  {
    path: '/home1/home02',
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