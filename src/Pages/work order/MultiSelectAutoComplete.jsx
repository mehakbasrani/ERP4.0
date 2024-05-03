import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const MultiSelectAutoComplete = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const getSuggestions = (value) => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setInputValue(value);
  };

  const onSuggestionsClearRequested = () => {
    setInputValue("");
  };

  const onChange = (_, { newValue }) => {
    setInputValue(newValue);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    if (!selectedOptions.includes(suggestion)) {
      setSelectedOptions([...selectedOptions, suggestion]);
    }
    setInputValue("");
  };

  const inputProps = {
    placeholder: "Type something",
    value: inputValue,
    onChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={getSuggestions(inputValue)}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
      <ul>
        {selectedOptions.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectAutoComplete;
