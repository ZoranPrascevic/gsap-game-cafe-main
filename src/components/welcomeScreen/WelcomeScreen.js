import React, { useState, useEffect } from 'react'
import Preloader from '../preloader/Preloader'
import classes from './WelcomeScreen.module.css'

import managerVideo from '../../media/video/manager.mp4'
import q1_timeVideo from '../../media/video/q1_time.mp4'
import q1_wrongVideo from '../../media/video/q1_wrong.mp4'
import q2_timeVideo from '../../media/video/q2_wrong.mp4'
import q2_wrongVideo from '../../media/video/q2_wrong.mp4'
import q3_timeVideo from '../../media/video/q3_wrong.mp4'
import q3_wrongVideo from '../../media/video/q3_wrong.mp4'

const videos = [managerVideo, q2_wrongVideo, q3_timeVideo, q1_timeVideo, q1_wrongVideo, q2_timeVideo, q3_wrongVideo]

function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

const WelcomeScreen = ({ startGame }) => {
    const [isTransit, setIsTransit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadVideoId, setLoadVideoId] = useState(0)
    const [platform, setPlatform] = useState(false)

    useEffect(() => {
        setPlatform(iOS())
    })

    const handleClick = () => {
        setIsTransit(true);
        startGame()
    }

    const handleCanPlayThrough = () => {
        if (loadVideoId === videos.length - 1) {
            setIsLoading(false);
        } else {
            setLoadVideoId(loadVideoId + 1);
            console.log(loadVideoId)
        }
    }

    return (
        <div className={`${classes.wrapper} ${isTransit && classes.opacityZero}`}>
            <div className={classes.startBtn} onClick={handleClick}>Start game</div>
            {
                (isLoading && !platform) && <Preloader />
            }
            {
                (isLoading && !platform) && <video className={classes.preVideo} src={videos[loadVideoId]} onCanPlayThrough={handleCanPlayThrough} playsInline autoPlay muted />
            }
        </div>
    )
}

export default WelcomeScreen
