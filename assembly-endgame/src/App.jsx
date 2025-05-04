import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { nanoid } from "nanoid"
import './index.css'
import KeyboardKeys from './components/KeyboardKeys'
import WordLetter from './components/WordLetter'

function App() {

  const [keys, setKeys] = useState(() => generateKeys())
  const [word, setWord] = useState(() => generateWord())
  const wordKey = useRef(null)


  function generateKeys() {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    return new Array(26)
      .fill(0)
      .map((_, index) => ({
        value: alphabet[index],
        isHeld: false,
        id: nanoid()
      }))
  }

  function generateWord() {
    const words = ["RANDOM", "CHOCOLAT"]
    const randomWord = words[Math.floor(Math.random() * words.length)]

    return new Array(randomWord.length)
      .fill(0)
      .map((_, index) => ({
        value: randomWord.charAt(index),
        isFound: false,
        id: nanoid()
      }))

  }

  function hold(id, value) {
    setKeys(oldKey => oldKey.map(key => key.id === id ?
      { ...key, isHeld: !key.isHeld } : key
    )
    )

    setWord(oldWord => oldWord.map(key => key.value == value ?
      { ...key, isFound: !key.isFound } : key
    )
    )
  }

  const keysElements = keys.map(keyObj =>
    <KeyboardKeys
      id={keyObj.id}
      key={keyObj.id}
      value={keyObj.value}
      isHeld={keyObj.isHeld}
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
        <h1 className='title'>Assembly: Endgame</h1>
        <p className='instructions'>Guess the word in under 8 attemps to keep the programming world safe from Assembly!</p>

        <span className='letter-container'>
          {wordElements}
        </span>

        <div className='key-container'>
          {keysElements}
        </div>

      </main>

    </span>
  )
}

export default App
