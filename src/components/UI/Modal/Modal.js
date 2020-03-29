import React from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'


function Modal(props) {
    const { show, children, close, closeLabel } = props
    return (
        <React.Fragment>
            <Backdrop key="backdrop" click={close} show={show} />
            <div className={classes.Modal} style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}>
                <div className={classes.CloseButton}><a href="/" onClick={close}>{closeLabel}</a></div>
                {children}
            </div>
        </React.Fragment>
    )
}
export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children)