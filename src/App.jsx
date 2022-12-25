import React, { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'
import Die from './components/Die'

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [currentRollCount, setCurrentRollCount] = useState(0)
    const [pastScores, setPastScores] = useState(JSON.parse(localStorage.getItem("pastScores")) || [])
    const [bestScore, setBestScore] = useState(findHighestScore())
    const [clock, setClock] = useState(0)
    
    function findHighestScore() {
        return pastScores.length > 0 && pastScores.reduce((a, b) => a < b ? a : b)
    }
    
    useEffect(() => {
        localStorage.setItem("pastScores", JSON.stringify(pastScores))
    }, [pastScores])
    
    // check to see if user won the game
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const baseValue = dice[0].value
        const allSameValue = dice.every(die => die.value === baseValue)
        
        // if winning conditions are met
        if (allHeld && allSameValue) {
            setTenzies(true)
            setPastScores(prevState => [...prevState, currentRollCount])
        }
    }, [dice])

    function generateDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false
        }
    }
    
    // create new dice
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateDie())
        }
        return newDice
    }
    
    // display dice
    const allDice = dice.map(die => (
        <Die 
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            handleDieClick={() => handleDieClick(die.id)}
        />
    ))
    
    // hold die
    function handleDieClick(id) {
        setDice(prevDice => {
            return prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
        })
    }
    
        // reset clock
    function resetClock() {
        console.log("reset")
    }
    
    // roll all dice that are not held
    function rollDice() {
        if (tenzies) {
            setTenzies(false)
            setDice(allNewDice())
            setCurrentRollCount(0)
            setBestScore(findHighestScore())
        } else {
            setDice(prevDice => {
                return prevDice.map(die => {
                    return die.isHeld ? 
                    die : 
                    generateDie()
                })
            })
            
            //track rolls:
            setCurrentRollCount(prevCount => prevCount + 1)
        }
    }
    
    function handleKeyPress(e) {
        e.code === "Enter" && rollDice()
    }
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
            <div className="container--dice">
                {allDice}
            </div>
            
            <button onClick={rollDice} onKeyPress={handleKeyPress}>{tenzies ? "New Game" : "Roll Dice"}</button>
            
            <div className="container--rolls">
                <div className="rolls">
                    <p>Number of Rolls: {currentRollCount}</p>
                </div>
            </div>
            
            
            <h3>Scoreboard:</h3>
            <div className="container--scores">
                <div className="last-game-score">
                    <p>Last Game:</p>
                    <p className="digits">{pastScores.length > 0 ? pastScores.at(-1) : "0"}</p>
                </div>
                <div className="current-record">
                    <p>Current Record:</p>
                    <p className="digits">{bestScore}</p>
                </div>
            </div>
        </main>
    )
}