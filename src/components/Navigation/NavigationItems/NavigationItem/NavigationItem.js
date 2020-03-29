import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink, withRouter} from 'react-router-dom'

const navigatiomItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
    </li>
)

export default withRouter(navigatiomItem)