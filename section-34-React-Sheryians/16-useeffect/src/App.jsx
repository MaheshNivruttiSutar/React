import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css'


const App = () => {

  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  function aChanging() {
    console.log('A ki value change ho gyi');
  }

  function bChanging() {
    console.log('B ki value change ho gyi');
  }

  useEffect(function () {
    aChanging()
  }, [a])

  useEffect(function () {
    bChanging()
  }, [b])

  return (
    <div>
      <h1 className="App">A is {a}</h1>
      <h1 className="App" >B is {b}</h1>
      <button
        onClick={() => {
          setA(a + 1)
        }}
      >Change A</button>
      <button
        onClick={() => {
          setB(b - 1)
        }}
      >Change B</button>
    </div>
  )
}

export default App