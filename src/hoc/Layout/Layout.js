import React, { useState } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.module.css'


function Layout(props) {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => setShowSideDrawer(false)

    // const sideDrawerOpenHandler = () => setShowSideDrawer(true)

    const toggleDrawerHandler = () => setShowSideDrawer(!showSideDrawer)

    return (
        <React.Fragment>
            <Toolbar toggle={toggleDrawerHandler} />
            <SideDrawer openDrawer={showSideDrawer} closedDrawer={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout