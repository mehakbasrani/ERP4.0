import React, { useState } from 'react';

const Suggestion = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const staticSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes','Mango','papaya'];
    const filteredSuggestions = staticSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      <div>
        {suggestions.map((suggestion, index) => (
          <div key={index}>{suggestion}</div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
