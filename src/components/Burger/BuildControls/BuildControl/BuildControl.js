import React from 'react'
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.ButtonHolder}>
            <button className={classes.Less} disabled={props.disabled || props.modal} onClick={props.removed}>-</button>
        <div className={classes.Label}>{props.label}</div>
            <button  className={classes.More} disabled={props.modal} onClick={props.added}>+</button>
        </div>
    </div>
)

export default buildControl