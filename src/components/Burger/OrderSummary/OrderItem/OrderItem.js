import React from 'react'

import classes from './OrderItem.module.css'

const orderItem = (props) => (
    <li className={classes.OrderListItem}>
        <p>{props.name}</p>
        <span className={classes.OrderListAmount}>$ {props.price}</span>
        <span className={classes.OrderListUnitaryPrice}>x {props.quantity}</span>
        <span className={classes.OrderListTotalPrice}>${props.total}</span>
    </li>
)

export default orderItem