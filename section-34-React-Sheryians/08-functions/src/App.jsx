import React from 'react'
import './App.css'

const App = () => {
  function btnClicked(){
    console.log('hello');
  }
  return (
    <div>
      <button className='button' onClick={btnClicked}>Click me</button>
    </div>
  )
}

export default App