import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState()
  const [copied, setCopied] = useState(false)

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNIOPQSTUVWXYZabcdefghijklmnopqrstuvwqyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "@#$%&*-_/!"

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  } , [length, setPassword, numAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className='bg-gray-900 flex flex-col rounded-lg shadow-xl mt-20 px-20 py-10 items-center justify-center mx-auto w-[500px]'>
      <h2 className='text-center text-2xl text-white font-bold'>Password Generator</h2>
      <div className='flex flex-row mt-8'>
        <input readOnly value={password} ref={passwordRef} type='text' placeholder='Password' className='text-blue-800 px-3 py-2 max-w-180 outline-none rounded-md'/>
        <button className='bg-blue-800 outline-none text-white rounded-md px-3 py-0.5 shrink-0 ml-4 relative' onClick={copyPasswordToClipboard}>
          Copy
          {copied && <span className='absolute top-[-40px] right-0 bg-gray-700 text-white rounded px-3 py-1 text-center'>Copied</span>}
        </button>
      </div>

      <div className='flex flex-row gap-6 items-center  text-white mt-5'>
        <div className='flex flex-row gap-2 items-center'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
          <label className='flex'>Length: {length}</label>
        </div>

        <div className='flex ml-4'>
          <input type='checkbox' defaultChecked={numAllowed} id='numberInput' onChange={() => {setNumAllowed((prev) => !prev);}}/>
          <label>Numbers</label>
        </div>
        <div className='flex'>
          <input type='checkbox' defaultChecked={charAllowed} id='characterInput' onChange={() => {setCharAllowed((prev) => !prev);}}/>
          <label>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
