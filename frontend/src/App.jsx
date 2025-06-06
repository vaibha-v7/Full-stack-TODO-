import { useState, useEffect } from 'react'
import './App.css'
import InputField from './components/InputField'
import Full from './components/Full'
import { Input } from '@mui/material'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Full/>
      {/* <InputField/> */}
    </div>
  )
}

export default App
