import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'

import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => (
    <div className={classes.MobileOnly}>
        <button className={classes.DrawerButton} onClick={props.toggle}><FontAwesomeIcon icon={faAlignJustify}></FontAwesomeIcon></button>
    </div>
)

export default drawerToggle