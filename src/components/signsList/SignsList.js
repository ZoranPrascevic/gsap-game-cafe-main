import React, { useState, useEffect } from 'react'
import classes from './SignsList.module.css'
import LineTo from 'react-lineto';

const optionList = [
    {
        text: 'This Club recognises that it is against the law to serve alcohol to an intoxicated person',
        errText: 'This patron is not intoxicated',
    },
    {
        text: 'This Club recognises that it is against the law to serve or supply alcohol to any person under the age of 18',
        errText: 'This patron is over the age of 18',
    },
    {
        text: 'This Club recognises that it is against the law to allow intoxicated, disruptive or violent behaviour to occur on the premises',
        errText: 'This patron is not being disruptive',
    },
    {
        text: 'This Club will not serve shots or cocktails after midnight (12:00 AM)',
        errText: 'This patron is not making this type of order',
    },
    {
        text: 'This Club will only serve TWO drinks per customer after 10pm',
        errText: 'This patron is not making this type of order',
    },
    {
        text: 'This club does not serve drinks in test tubes or other containers which cannot be put down',
        errText: 'This patron is not making this type of order',
    },
    {
        text: 'This Club does not serve persons who are experiencing emotional distress, or who appear to be under the influence of illicit drugs',
        errText: 'This patron is not making this type of order',
    },
    {
        text: 'The patron is paticipating in three or more gambling activities simultaneously',
        errText: 'This patron is not displaying these signs'
    },
]

const lineTos = [
    17, 25, 36.5, 48.5, 57, 66, 75, 86
]

const ListChild = ({ handleCorrect, isTrue, content, isChoice }) => {
    const [showCard, setShowCard] = useState(false)
    const [isntFalse, setIsntFalse] = useState(false)
    const [itemData, setItemData] = useState({
        text: "",
        errText: ""
    })
    const [isSelect, setIsSelect] = useState(false)

    useEffect(() => {
        setIsntFalse(isTrue);
        setItemData(content);
        setIsSelect(isChoice)
    }, [isTrue, content, isChoice])

    const handleClick = () => {
        if (isSelect) {
            if (isntFalse) {
                handleCorrect()
            } else {
                setShowCard(true)
            }
        }
    }
    return (
        <li onClick={handleClick} className={`${classes.optionItem} ${isSelect && classes.selectable}`}>
            {itemData.text}
            {
                showCard && (
                    <div className={classes.errCard}>
                        <div className={classes.errTimes}>&times;</div>
                        <div className={classes.errCardText}>{itemData.errText}</div>
                    </div>
                )
            }
        </li>
    )
}

const SignsList = ({ isSelect, closeBox, correctItems, handleCorrect }) => {

    const [corrects, setCorrects] = useState([9])
    const [isChoice, setIsChoice] = useState(false)
    useEffect(() => {
        setIsChoice(isSelect)
        setCorrects(correctItems)
    }, [isSelect, correctItems])

    return (
        <div className={classes.signsListWrapper}>
            <div className={classes.listPaper}>
                <div onClick={closeBox} className={classes.closeBtn}><span>&times;</span></div>
                <div className={classes.paperHeading}>HOUSE POLICY</div>
                <ul className={classes.signsSelect}>
                    {
                        optionList.map((item, index) =>
                            <ListChild key={index} handleCorrect={() => handleCorrect(index)} isTrue={corrects ? (corrects.includes(index) ? true : false) : false} content={item} isChoice={isChoice} />
                        )
                    }
                </ul>
            </div>
            {
                isChoice && (
                    <div className={classes.helperPaper}>
                        <div className={classes.helperHeader}>WHY ARE YOU REFUSING SERVICE?</div>
                        <div className={classes.helperGuide}>Please click on the "House Policy" (right) that relates to the reason you are refusing service.</div>
                        <div className={classes.helperCancel}>To cancel the refusal please close the house policy.</div>
                        {
                            lineTos.map((item, index) => {
                                return (
                                    <LineTo fromAnchor="24.7% 50%" toAnchor={"31.5% " + item + "%"} key={index} borderStyle="dashed" borderColor="#2b2b2b" borderWidth={2} from={classes.signsListWrapper} to={classes.signsListWrapper} within={classes.signsListWrapper} />
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SignsList
