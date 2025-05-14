import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import Suggestions from "./Suggestions";
import "./style.css";

const Autocomplete = ({
  customLoading,
  dataKey = "",
  fetchSuggestions,
  onChange,
  onFocus,
  onSelect,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event?.target?.value);
    onChange(event?.target?.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result = await fetchSuggestions(query);
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionDebounce = useCallback(debounce(getSuggestions, 300), []);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion[dataKey]);
    onSelect(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionDebounce(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="container">
      <input
        onChange={(event) => handleInputChange(event)}
        onFocus={onFocus}
        placeholder={placeholder}
        type="text"
        value={inputValue}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <Suggestions
            dataKey={dataKey}
            highlight={inputValue}
            onSuggestionClick={handleSuggestionClick}
            suggestions={suggestions}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
