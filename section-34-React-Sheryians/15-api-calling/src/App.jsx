import axios from 'axios'
import { useState } from 'react'
import './App.css'

const App = () => {

  const [data, setData] = useState([])

  const getData = async () => {
    
    // const response = await axios.get('https://picsum.photos/v2/list')
    // setData(response.data)

    const response = await fetch('https://picsum.photos/v2/list')
    const result = await response.json()
    setData(result)

  }
  return (
    <div className="app">
      <button onClick={getData}>Get Data</button>
      <div>
        {data.map(function(elem,idx){

          return <h3>Hello, {elem.author} {elem.id} {idx}</h3>
        })}
      </div>
    </div>
  )
}

export default App