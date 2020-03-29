import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import classes from './Logo.module.css'

const styles = {
    light: {
        color: '#111'
    },
    dark: {
        color: "white"
    }
}

const logo = (props) => {
    const { theme = "dark" } = props
    return (
        <div className={classes.Logo} style={styles[theme]}>
            <Link to="/">Build-a-burger&#8482;</Link>
        </div>
    )
}

export default withRouter(logo)