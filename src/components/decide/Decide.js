import React from 'react'
import classes from './Decide.module.css'

import arrowMidnight from '../../media/image/arrow_midnight.png'
import arrowTime from '../../media/image/arrow_time.png'
import arrowPolicy from '../../media/image/arrow_policy.png'
import refuseIcon from '../../media/image/refuse.png'
import makeIcon from '../../media/image/make.png'

const Decide = ({handleDecide, openSignsList}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>INSTRUCTIONS</div>
            <div className={classes.guides}>
                Consider the <span className={classes.redText}>legislative signage &#11044;</span> , <span className={classes.redText}>current time &#11044;</span>   the customer's behaviour, and the <span className={classes.redText}>house policy &#11044;</span>  then select one of the following options:
                <img className={classes.arrowMidnight} src={arrowMidnight} alt="midnight" />
                <img className={classes.arrowTime} src={arrowTime} alt="time" />
                <img className={classes.arrowPolicy} src={arrowPolicy} alt="policy" />
            </div>
            <div onClick={openSignsList} className={classes.btn}>
                <div>Refuse Service</div>
                <img src={refuseIcon} alt="Refuse" />
            </div>
            <div onClick={handleDecide} className={classes.btn}>
                <div>Make Drink</div>
                <img src={makeIcon} alt="Make" />
            </div>
        </div>
    )
}

export default Decide
