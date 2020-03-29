import React from 'react'

import classes from './Input.module.css'

const Input = React.forwardRef(({ label, register, message, errors, required, ...props }, ref) => ( 
    <div className={classes.InputControl}>
        {label && <span className={classes.Label}>{label}</span>}
        <input ref={ref} {...props} required />
        { errors && errors[props.name] && <p className={classes.errorField}>{message}</p> }
    </div>
  ))

export default Input