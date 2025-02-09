import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('professional')

  const remixStyles = [
    { id: 'professional', label: 'Professional' },
    { id: 'casual', label: 'Casual' },
    { id: 'funny', label: 'Funny' },
    { id: 'poetic', label: 'Poetic' }
  ]

  const handleRemix = async () => {
    if (!inputText.trim()) return
    
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/remix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          style: selectedStyle
        })
      })
      const data = await response.json()
      setOutputText(data.remixedText)
    } catch (error) {
      console.error('Error remixing content:', error)
      setOutputText('Error remixing content. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Content Remixer</h1>
        
        <div className="space-y-6 bg-white p-6 rounded-lg shadow">
          {/* Input Section */}
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <textarea
              id="input"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to remix..."
            />
          </div>

          {/* Style Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Style
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {remixStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedStyle === style.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Remix Button */}
          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Remixing...' : 'Remix Content'}
          </button>

          {/* Output Section */}
          {outputText && (
            <div>
              <label htmlFor="output" className="block text-sm font-medium text-gray-700">
                Remixed Text
              </label>
              <div
                id="output"
                className="mt-1 p-4 block w-full rounded-md border border-gray-300 bg-gray-50"
              >
                {outputText}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 