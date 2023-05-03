import React, {useState, useRef, useEffect} from 'react'
import classes from './AlertVideo.module.css'
import Speech from '../speech/Speech'

import managerVideo from '../../media/video/manager.mp4'
import time1 from '../../media/video/q1_time.mp4'
import time2 from '../../media/video/q2_time.mp4'
import time3 from '../../media/video/q3_time.mp4'
import wrong1 from '../../media/video/q1_wrong.mp4'
import wrong2 from '../../media/video/q2_wrong.mp4'
import wrong3 from '../../media/video/q3_wrong.mp4'
import managerVideoImg from '../../media/image/manager.jpg'
import time1Img from '../../media/image/q1_time.jpg'
import time2Img from '../../media/image/q2_time.jpg'
import time3Img from '../../media/image/q3_time.jpg'
import wrong1Img from '../../media/image/q1_wrong.jpg'
import wrong2Img from '../../media/image/q2_wrong.jpg'
import wrong3Img from '../../media/image/q3_wrong.jpg'

const alerts = [
    {
        src: managerVideo,
        imgSrc: managerVideoImg,
        msg: "That's not right, make sure to read the instructions."
    },
    {
        src: time1,
        imgSrc: time1Img,
        msg: "Why is it taking so long?!"
    },
    {
        src: wrong1,
        imgSrc: wrong1Img,
        msg: "That is NOT what I orderd!"
    },
    {
        src: time2,
        imgSrc: time2Img,
        msg: "Come on, it is taking too long..."
    },
    {
        src: wrong2,
        imgSrc: wrong2Img,
        msg: "That is NOT what I orderd!"
    },
    {
        src: time3,
        imgSrc: time3Img,
        msg: "Why is it taking so long?!"
    },
    {
        src: wrong3,
        imgSrc: wrong3Img,
        msg: "No, I didn't order that!"
    },
    {
        src: time2,
        imgSrc: time2Img,
        msg: "Come on, it is taking too long..."
    },
    {
        src: wrong2,
        imgSrc: wrong2Img,
        msg: "That is NOT what I orderd!"
    },
    {
        src: time1,
        imgSrc: time1Img,
        msg: "Why is it taking so long?!"
    },
    {
        src: wrong1,
        imgSrc: wrong1Img,
        msg: "That is NOT what I orderd!"
    },
    {
        src: time3,
        imgSrc: time3Img,
        msg: "Why is it taking so long?!"
    },
    {
        src: wrong3,
        imgSrc: wrong3Img,
        msg: "No, I didn't order that!"
    }
]

const AlertVideo = ({index, handleAlert, isMuted, platform}) => {

    const [showTexts, setShowTexts] = useState(false)
    const theVideo = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            if (platform) handleAlert(index)
        }, 2000);
    })

    return (
        <div className={classes.wrapper}>
            <div className={classes.alertBox}>
                <div className={classes.videoBox}>
                    {
                        platform ? (
                            <img src={alerts[index].imgSrc} alt="Alert!" />
                        ) : (
                            <video ref={theVideo} onPlay={() => setShowTexts(true)} src={alerts[index].src} onEnded={() => handleAlert(index)} autoPlay={true} playsInline muted={isMuted} controls={false} disableRemotePlayback />
                        )
                    }
                </div>
            </div>
            {
                (showTexts || platform) && <Speech x={-120} y={54} text={alerts[index].msg} orient={true} />
            }
        </div>
    )
}

export default AlertVideo
