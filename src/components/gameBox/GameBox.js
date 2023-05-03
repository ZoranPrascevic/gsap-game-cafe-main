import React, { useState, useEffect } from 'react'
import classes from './GameBox.module.css'
import MainVideo from '../mainVideo/MainVideo'
import Equipment from '../equipment/Equipment'
import Glass from '../glass/Glass'
import Drink from '../drink/Drink'
import Pour from '../pour/Pour'

import screenfull from 'screenfull'

import gameData from '../../gameData.json'
import crowdSound from '../../media/audio/crowd.mp3'
import AlertVideo from '../alertVideo/AlertVideo'
import postMessage from '../../actions/postMessage'


const times = [
    "10:38 PM",
    "10:57 PM",
    "11:12 PM",
    "11:45 PM",
    "12:07 AM",
    "12:28 AM"
]

var doTimeout = null;

const GameBox = ({ goToFirst }) => {

    const [level, setLevel] = useState(0)
    const [step, setStep] = useState(0)
    const [showGuides, setShowGuides] = useState(false)
    const [hearts, setHearts] = useState(2)
    const [videoSrc, setVideoSrc] = useState(0)
    const [isLoop, setIsLoop] = useState(false)
    const [hasSpeech, setHasSpeech] = useState(false)
    const [speech, setSpeech] = useState({
        text: "",
        time: 0
    })
    const [actionType, setActionType] = useState("watch")
    const [orderDetail, setOrderDetail] = useState("")
    const [watchWrong, setWatchWrong] = useState(false)
    const [tempVideoSrc, setTempVideoSrc] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertId, setAlertId] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullScr, setIsFullScr] = useState(false)
    const [platform, setPlatform] = useState("unknown")
    const [curTime, setCurTime] = useState(0)

    const goNextStep = (skip) => {
        console.log("NEXT! ", skip)
        if (watchWrong) {
            setWatchWrong(false)
            setVideoSrc(tempVideoSrc)
            setIsLoop(true)
        } else {
            if (skip) {
                setStep(step + 2)
            } else {
                if (step === gameData[level].length - 1) {
                    if (level === gameData.length - 1) {
                        postMessage(3);
                        goToFirst()
                    } else {
                        setCurTime(0)
                        setLevel(level + 1)
                        setStep(0)
                        setHearts(2)
                    }
                } else {
                    setStep(step + 1)
                }
            }
        }
    }

    useEffect(() => {
        setPlatform(iOS())
    })

    useEffect(() => {
        if (curTime > 3) {
            setAlertId(((level + 1) * 2) - 1)
            setShowAlert(true)
        }
        clearTimeout(doTimeout)
        doTimeout = setTimeout(() => {
            setCurTime(curTime + 1)
        }, 23000);

        return () => {
            clearTimeout(doTimeout)
        }
    }, [curTime])

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

    useEffect(() => {
        var gData = gameData[level][step];
        setActionType(gData.playType);
        switch (gData.playType) {
            case 'watch':
                setVideoSrc(gData.video);
                setIsLoop(false)
                if (gData.speech) {
                    setSpeech(gData.speech);
                    setHasSpeech(true);
                } else {
                    setHasSpeech(false)
                }
                setShowGuides(gData.guides ? true : false)
                break;

            case 'decide':
                setVideoSrc(gData.video);
                setIsLoop(true);
                setShowGuides(true);
                break;

            default:
                setHasSpeech(false);
                setOrderDetail(gData.order ? gData.order : orderDetail);
                setShowGuides(false);
                break;
        }
    }, [step, level])

    const handleCorrect = (index) => {
        goNextStep(gameData[level][step]["skip"][index] ? true : false);
        postMessage(1);
    }
    
    const handleDecide = () => {
        if (gameData[level][step].answer) {
            goNextStep(false)
            postMessage(1);
        } else {
            setAlertId(0);
            setShowAlert(true);
            postMessage(0);
        }
    }
    
    const handleEquipment = (index) => {
        if (gameData[level][step].answer === index) {
            goNextStep(false);
            postMessage(1);
        } else {
            setWatchWrong(true);
            setTempVideoSrc(videoSrc)
            setVideoSrc(10);
            setIsLoop(false);
            setAlertId(0);
            setShowAlert(true);
            postMessage(0);
        }
    }
    
    const handleGlass = (index) => {
        if (gameData[level][step].answer === index) {
            goNextStep(false);
            postMessage(1);
        } else {
            setWatchWrong(true);
            setTempVideoSrc(videoSrc)
            setVideoSrc(20);
            setIsLoop(false);
            setAlertId(0);
            setShowAlert(true);
            postMessage(0);
        }
    }
    const handleDrink = (index) => {
        if (gameData[level][step].answer === index) {
            goNextStep(false);
            postMessage(1);
        } else {
            setWatchWrong(true);
            setTempVideoSrc(videoSrc)
            setVideoSrc(30);
            setIsLoop(false);
            setAlertId(((level + 1) * 2));
            setShowAlert(true);
            postMessage(0);
        }
    }
    
    const handlePour = (choice) => {
        if (gameData[level][step].answer === choice) {
            goNextStep(false)
            postMessage(1);
        } else {
            setAlertId(0);
            setShowAlert(true);
            postMessage(0);
        }
    }

    const handleAlert = (index) => {
        setShowAlert(false)
        if ((index % 2) === 0) {
            if (hearts === 0) {
                postMessage(2);
                goToFirst();
            } else {
                setHearts(hearts - 1)
            }
        }
    }

    const goFullScr = () => {
        if (isFullScr === true) {
            if (screenfull.isEnabled) {
                screenfull.exit();
                setIsFullScr(false)
            } else {
                alert("Your browser does not support fullscreen mode.")
            }
        } else {
            if (screenfull.isEnabled) {
                screenfull.request();
                setIsFullScr(true)
            } else {
                alert("Your browser does not support fullscreen mode.")
            }
        }
    }

    return (
        <div className={`${classes.wrapper} ${(step > 0 && (actionType === 'equipment' || gameData[level][step - 1].playType === 'equipment')) && classes.equipment} ${(step > 0 && (actionType === 'glass' || gameData[level][step - 1].playType === 'glass')) && classes.glass} ${(step > 0 && (actionType === 'drink' || gameData[level][step - 1].playType === 'drink')) && classes.drink} ${(step > 0 && (actionType === 'pour' || gameData[level][step - 1].playType === 'pour')) && classes.equipment}`}>

            <MainVideo correctItems={gameData[level][step].answer ? [9] : gameData[level][step].correctItems} level={level} videoSrc={videoSrc} isLoop={isLoop} hasSpeech={hasSpeech} speech={speech} showGuides={showGuides} goNextStep={(skip) => goNextStep(skip)} clockTime={times[level]} handleCorrect={(index) => handleCorrect(index)} handleDecide={handleDecide} isMuted={isMuted} />
            <audio autoPlay playsInline loop controls={false} src={crowdSound} muted={isMuted} />

            {
                {
                    'equipment': <Equipment isWatchWrong={watchWrong} orderDetail={orderDetail} handleEquipment={(index) => handleEquipment(index)} />,
                    'glass': <Glass isWatchWrong={watchWrong} orderDetail={orderDetail} handleGlass={(index) => handleGlass(index)} />,
                    'drink': <Drink isWatchWrong={watchWrong} orderDetail={orderDetail} handleDrink={(index) => handleDrink(index)} />,
                    'pour': <Pour orderDetail={orderDetail} handlePour={(choice) => handlePour(choice)} />,
                }[actionType]
            }

            {
                showAlert && <AlertVideo index={alertId} platform={platform} handleAlert={(index) => handleAlert(index)} isMuted={isMuted} />
            }

            <div onClick={() => setIsMuted(!isMuted)} className={classes.muteBtn}>{isMuted ? "Unmute" : "Mute"} Sound</div>
            <div onClick={goFullScr} className={classes.fscrBtn}>{isFullScr ? "Exit" : ""} Full Screen</div>

        </div>
    )
}

export default GameBox
