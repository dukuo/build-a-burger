import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

import NavigationItems from '../NavigationItems/NavigationItems'

import DrawerToggle from './DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}> 
        <DrawerToggle toggle={props.toggle} />
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar