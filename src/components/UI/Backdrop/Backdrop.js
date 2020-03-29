import React from 'react'
import classes from './Backdrop.module.css'

const hideModalStyle = {
    display: 'none'
}

const backdrop = (props) => (
    <div>
        <div className={classes.Overlay} onClick={props.click} style={!props.show ? hideModalStyle : null}></div>
    </div>
)

export default backdrop