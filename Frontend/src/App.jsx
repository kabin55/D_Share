import React from 'react'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800">Tailwind Card</h2>
        <p className="text-gray-600 mt-3">
          This is a simple card layout built with Tailwind CSS.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Learn More
        </button>
        <Home/>
      </div>
    </div>
  )
}

export default App
