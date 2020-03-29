import React from 'react'
import classes from './BurgerPriceControl.module.css'

const burgerPriceControl = (props) => (
    <div className={classes.BurgerPriceControl}>
        <h2>Your total is <span> ${props.price}</span></h2>
    </div>
)

export default burgerPriceControl