import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { useState } from 'react';


function App() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default to English
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
  const [translatedText, setTranslatedText] = useState('hi');//Default to Hindi
  const [translatedText, setTranslatedText] = useState('');


  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name:'Hindi'}
  
  ];

  const handleTranslate = async () => {
    
    try {
      const response = await fetch('YOUR_TRANSLATION_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // If required
        },
        body: JSON.stringify({
          text: inputText,
          from: sourceLanguage,
          to: targetLanguage,
        }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText); // Adjust based on API response structure
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error during translation.');
    }
  };

  return (
    <div>
      <h1>Text Translator</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />
      <div>
        <label>From:</label>
        <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <label>To:</label>
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
}

export default App;