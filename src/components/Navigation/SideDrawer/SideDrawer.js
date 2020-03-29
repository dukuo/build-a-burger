import React, {useEffect, useState} from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.module.css'

function SideDrawer(props) {
    
    const { openDrawer, closedDrawer } = props
    
    const [attachedClasses, setAttachedClasses] = useState([])

    useEffect(() => {
        if(openDrawer) {
            setAttachedClasses([classes.SideDrawer, classes.Open])
        } else if(closedDrawer) {
            setAttachedClasses([classes.SideDrawer, classes.Close])
        }
    }, [openDrawer, closedDrawer])
    
    return(
        <React.Fragment>
            <Backdrop show={openDrawer} click={closedDrawer} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo theme="light" />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    )
}

export default SideDrawer