import React from 'react'
import { useState } from 'react'

const App = () => {

  const [title, setTitle] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Form Submitted by', title);

    setTitle('')
  }

  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input
          type="text"
          placeholder='Enter your name'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h1>Submitted value is: {title}</h1>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App