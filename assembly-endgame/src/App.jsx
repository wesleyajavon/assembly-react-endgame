import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { nanoid } from "nanoid"
import './index.css'
import KeyboardKeys from './components/KeyboardKeys'
import WordLetter from './components/WordLetter'
import Confetti from "react-confetti"




function App() {

  const [keys, setKeys] = useState(() => generateKeys());
  const [word, setWord] = useState([]); // Start empty until data is fetched
  const [wordArray, setWordArray] = useState([]);
  const wordKey = useRef(null);
  const [lifes, setLifes] = useState(8);
  const redirectButton = useRef(null)


  const gameWon = word.every(letter => letter.isFound)
  const gameLost = lifes <= 0

  // Fetch words from JSON
  useEffect(() => {
    fetch("/data.json") // place data.json in public/ directory
      .then((res) => res.json())
      .then((data) => {
        setWordArray(data.words);

        // Generate a word once we have the list
        const randomWord = data.words[Math.floor(Math.random() * data.words.length)];
        setWord(
          Array.from(randomWord).map((letter) => ({
            value: letter.toUpperCase(),
            isFound: false,
            id: nanoid(),
          }))
        );
      })
      .catch((err) => console.error("Error fetching words:", err));
  }, []);

  useEffect(() => {
    if (gameWon || gameLost) {
      redirectButton.current?.focus()
    }

  }, [gameWon, gameLost])

  function generateKeys() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return alphabet.map((letter) => ({
      value: letter,
      isHeld: false,
      toRed: false,
      toGreen: false,
      disabled: false,
      id: nanoid(),
    }));
  }

  function hold(id, value) {
    const isInWord = word.some(w => w.value === value);

    setKeys(oldKeys =>
      oldKeys.map(key => {
        if (key.id === id) {
          return {
            ...key,
            isHeld: true,
            toRed: !isInWord,
            toGreen: isInWord
          };
        }

        return key;
      })
    );

    setWord(oldWord =>
      oldWord.map(letter =>
        letter.value === value
          ? { ...letter, isFound: true }
          : letter
      )
    );

    if (!isInWord) {
      setLifes(prev => prev - 1);
    }

  }

  function rollWords() {

    setKeys(generateKeys)

    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    setWord(
      Array.from(randomWord).map((letter) => ({
        value: letter.toUpperCase(),
        isFound: false,
        id: nanoid(),
      }))
    )

    setLifes(8)

  }

  const keysElements = keys.map(keyObj =>
    <KeyboardKeys
      id={keyObj.id}
      key={keyObj.id}
      value={keyObj.value}
      isHeld={keyObj.isHeld}
      toRed={keyObj.toRed}
      toGreen={keyObj.toGreen}
      disabled={gameWon || gameLost || keyObj.isHeld}
      hold={() => hold(keyObj.id, keyObj.value)}
    />)

  const wordElements = word.map(wordObj =>
    <WordLetter
      id={wordObj.id}
      key={wordObj.id}
      isFound={wordObj.isFound}
      value={wordObj.value}
      ref={wordKey}
    />)

  return (
    <span>

      <main>
        {gameWon && <Confetti />}

        <h1 className='title'>Assembly: Endgame</h1>
        <p className='instructions'>Guess the word in under 8 attemps to keep the programming world safe from Assembly!</p>
        
        <div aria-live="polite" className='win'>
          {gameWon && <p>Congratulations! You've won! Press "New Game" to start again.</p>}
        </div>

        <div aria-live="polite" className='lose'>
          {gameLost && <p>Too bad! You've lost! Press "New Game" to start again.</p>}
        </div>
        
        <p className='instructions'>Lifes left: {lifes} </p>
        <span className='letter-container'>
          {wordElements}
        </span>

        <div className='key-container'>
          {keysElements}
        </div>

        {gameWon || gameLost ?
          <div>
            <button ref={redirectButton} className='roll-words' onClick={rollWords}>
              New Game
            </button>
          </div>
          : null}


      </main>

    </span>
  )
}

export default App
