import React, {useState, useEffect} from 'react'
import classes from './Speech.module.css'
import backImg from '../../media/image/speech.png'

const Speech = ({x, y, text, orient}) => {

    const [xx, setXx] = useState(0)
    const [yy, setYy] = useState(0)
    const [content, setContent] = useState("")
    const [rot, setRot] = useState(false)

    useEffect(() => {
        setXx(x);
        setYy(y);
        setContent(text);
        setRot(orient)
    }, [x, y, text, orient])

    return (
        <div className={classes.speechWrapper} style={{top: yy + "%", left: xx + "%"}}>
            <div className={classes.speechBox}>
                <img className={`${classes.speechBack} ${rot && classes.rotRev}`} src={backImg} alt="speech" />
                <div className={classes.speechText}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Speech
