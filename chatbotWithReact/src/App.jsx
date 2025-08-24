import React from 'react'
import Chat from './components/Chat'

function App() {
  return (
    <div className='max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hiddden'>
      <div className='w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden'>
        <Chat/>
      </div>
    </div>
  )
}

export default App
