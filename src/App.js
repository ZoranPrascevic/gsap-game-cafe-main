import React, {useState} from 'react'
import classes from './App.module.css'
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen'
import GameBox from './components/gameBox/GameBox'

function App() {

  const [gameStarted, setGameStarted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const startGame = () => {
    setGameStarted(true)
    setTimeout(() => {
      setShowWelcome(false)
    }, 1000);
  }

  const goToFirst = () => {
    setShowWelcome(true);
    setGameStarted(false);
  }

  return (
    <div className={classes.App}>
      {
        showWelcome && <WelcomeScreen startGame={startGame} />
      }
      {
        gameStarted && <GameBox goToFirst={goToFirst} />
      }
    </div>
  );
}

export default App;
