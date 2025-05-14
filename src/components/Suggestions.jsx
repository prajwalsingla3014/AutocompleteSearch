import React from "react";
import "./style.css";

const Suggestions = ({
  dataKey,
  highlight,
  onSuggestionClick,
  suggestions,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };
  return (
    <>
      {suggestions?.map((suggestion, index) => (
        <li
          className="suggestion-item"
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
        >
          {getHighlightedText(suggestion[dataKey], highlight)}
        </li>
      ))}
    </>
  );
};

export default Suggestions;
