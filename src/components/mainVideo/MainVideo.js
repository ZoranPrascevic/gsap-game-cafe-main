import React, { useRef, useState, useEffect } from 'react'
import classes from './MainVideo.module.css'
import q1_order from '../../media/video/q1/q1_order.mp4'
import q1_loop from '../../media/video/q1/q1_loop.mp4'
import q1_pick1 from '../../media/video/q1/q1_pick1.mp4'
import q1_pick2 from '../../media/video/q1/q1_pick2.mp4'
import q1_pick3 from '../../media/video/q1/q1_pick3.mp4'
import q1_serve from '../../media/video/q1/q1_serve.mp4'

import q2_order from '../../media/video/q2/q2_order.mp4'
import q2_loop from '../../media/video/q2/q2_loop.mp4'
import q2_pick1 from '../../media/video/q2/q2_pick1.mp4'
import q2_pick2 from '../../media/video/q2/q2_pick2.mp4'
import q2_pick3 from '../../media/video/q2/q2_pick3.mp4'
import q2_serve from '../../media/video/q2/q2_serve.mp4'

import q3_order from '../../media/video/q3/q3_order.mp4'
import q3_loop from '../../media/video/q3/q3_loop.mp4'
import q3_pick1 from '../../media/video/q3/q3_pick1.mp4'
import q3_pick2 from '../../media/video/q3/q3_pick2.mp4'
import q3_pick3 from '../../media/video/q3/q3_pick3.mp4'
import q3_pick4 from '../../media/video/q3/q3_pick4.mp4'
import q3_serve from '../../media/video/q3/q3_serve.mp4'

import q4_order from '../../media/video/q4/q4_order.mp4'
import q4_loop from '../../media/video/q4/q4_loop.mp4'
import q4_pick1 from '../../media/video/q4/q4_pick1.mp4'
import q4_pick2 from '../../media/video/q4/q4_pick2.mp4'
import q4_pick3 from '../../media/video/q4/q4_pick3.mp4'
import q4_pick4 from '../../media/video/q4/q4_pick4.mp4'
import q4_serve from '../../media/video/q4/q4_serve.mp4'

import q5_order1 from '../../media/video/q5/q5_order1.mp4'
import q5_order2 from '../../media/video/q5/q5_order2.mp4'
import q5_loop from '../../media/video/q5/q5_loop.mp4'
import q5_pick1 from '../../media/video/q5/q5_pick1.mp4'
import q5_pick2 from '../../media/video/q5/q5_pick2.mp4'
import q5_serve from '../../media/video/q5/q5_serve.mp4'

import q6_order from '../../media/video/q6/q6_order.mp4'
import q6_loop from '../../media/video/q6/q6_loop.mp4'
import q6_oops1 from '../../media/video/q6/q6_oops1.mp4'
import q6_oops2 from '../../media/video/q6/q6_oops2.mp4'

import equipment_err from '../../media/video/err1.mp4'
import glass_err from '../../media/video/err2.mp4'
import drink_err from '../../media/video/err3.mp4'

import cardImg from '../../media/image/midnight.jpg'

import SignsList from '../signsList/SignsList'
import Speech from '../speech/Speech'
import Decide from '../decide/Decide'
import Preloader from '../preloader/Preloader'

const errVideoList = [
    equipment_err,
    glass_err,
    drink_err
];

const videoList = [
    [
        q1_order,
        q1_loop,
        q1_pick1,
        q1_pick2,
        q1_pick3,
        q1_serve
    ],
    [
        q2_order,
        q2_loop,
        q2_pick1,
        q2_pick2,
        q2_pick3,
        q2_serve
    ],
    [
        q3_order,
        q3_loop,
        q3_pick1,
        q3_pick2,
        q3_pick3,
        q3_pick4,
        q3_serve
    ],
    [
        q4_order,
        q4_loop,
        q4_pick1,
        q4_pick2,
        q4_pick3,
        q4_pick4,
        q4_serve
    ],
    [
        q5_order1,
        q5_order2,
        q5_loop,
        q5_pick1,
        q5_pick2,
        q5_serve
    ],
    [
        q6_order,
        q6_loop,
        q6_oops1,
        q6_oops2
    ]
]

const MainVideo = ({ level, videoSrc, isLoop, hasSpeech, speech, showGuides, goNextStep, correctItems, clockTime, handleCorrect, handleDecide }) => {

    const videoComp = useRef(null)
    const [showSpeech, setShowSpeech] = useState(false)
    const [showSigns, setShowSigns] = useState(false)
    const [selectSigns, setSelectSigns] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (hasSpeech === false) {
            setShowSpeech(false)
        }
    }, [hasSpeech])

    const handleTimeUpdate = () => {
        if (hasSpeech && !isLoop) {
            if (videoComp.current.currentTime > speech.time && videoComp.current.currentTime < speech.time + 0.3) {
                setShowSpeech(true)
                console.log("Show SPeech")
            }
        }
    }

    const handleEnded = () => {
        goNextStep(false)
    }

    const openSignsList = (choice) => {
        setSelectSigns(choice)
        setShowSigns(true)
    }

    const closeSignsList = () => {
        setShowSigns(false)
    }

    const doHandleCorrect = (index) => {
        setShowSigns(false);
        handleCorrect(index);
    }

    return (
        <div className={classes.mainVideo}>
            <video ref={videoComp} className={classes.videoBox} src={videoSrc < 10 ? videoList[level][videoSrc] : errVideoList[(videoSrc / 10) - 1]} loop={isLoop} onLoadStart={() => setIsLoading(true)} onCanPlayThrough={() => setIsLoading(false)} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} autoPlay={true} playsInline disableRemotePlayback />
            {
                showSigns && <SignsList isSelect={selectSigns} closeBox={closeSignsList} correctItems={correctItems} handleCorrect={(index) => doHandleCorrect(index)} />
            }
            {
                showGuides && <div onClick={() => openSignsList(false)} className={classes.signsListBtn}>HOUSE POLICY<br /><span className={classes.btnRedText}>CLICK HERE TO READ</span></div>
            }
            {
                showGuides && <div className={classes.cardPanel}><div className={classes.cardBack}></div><img className={classes.cardImg} src={cardImg} alt="No Shots after midnight" /></div>
            }
            {
                showGuides && <div className={classes.clock}>{clockTime}</div>
            }
            {
                showSpeech && <Speech x={0.5} y={8} text={speech.text} orient={false} />
            }
            {
                isLoop && <Decide handleDecide={handleDecide} openSignsList={() => openSignsList(true)} />
            }
            {
                isLoading && <Preloader />
            }
        </div>
    )
}

export default MainVideo
