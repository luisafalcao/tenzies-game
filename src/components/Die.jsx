import React from 'react';
import './Die.css'

export default function Die(props) {
    let cssClass = "none";
    
    switch (props.value) {
        case 1:
            cssClass = "one"
            break;
        case 2:
            cssClass = "two"
            break;
        case 3:
            cssClass = "three"
            break;
        case 4:
            cssClass = "four"
            break;
        case 5:
            cssClass = "five"
            break;
        case 6:
            cssClass = "six"
            break;
        case 7:
            cssClass = "seven"
            break;
        case 8:
            cssClass = "eight"
            break;
        case 9:
            cssClass = "nine"
            break;
        }
 
    return (
        <div className={`die ${cssClass} ${props.isHeld && "held"}`} onClick={props.handleDieClick}>
            <span className="circle-one"></span>
            <span className="circle-two"></span>
            <span className="circle-three"></span>
            <span className="circle-four"></span>
            <span className="circle-five"></span>
            <span className="circle-six"></span>
            <span className="circle-seven"></span>
            <span className="circle-eight"></span>
            <span className="circle-nine"></span>
        </div>
    )
}
