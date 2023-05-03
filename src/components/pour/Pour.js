import React from 'react'
import classes from './Pour.module.css'

const Pour = ({handlePour, orderDetail}) => {
    return (
        <div className={classes.wrapper}> 
            <div className={classes.header}>INSTRUCTIONS</div>
            <div className={classes.guides}>Recipe for this order is: "{orderDetail}".<br /><br />Select one of the following options:</div>
            <div className={classes.btn} onClick={() => handlePour(true)}>Pour Drink</div>
            <div className={classes.btn} onClick={() => handlePour(false)}>Serve to Customer</div>
        </div>
    )
}

export default Pour
