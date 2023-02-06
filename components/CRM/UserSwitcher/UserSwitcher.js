import React, { useState, useEffect, useRef } from "react";
import Autosuggest from "react-autosuggest";
import api from "apis/userAPI";
const UserSwitcher = ({ onSelected = () => {}, initialValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(initialValue);

  // const inputValue = useRef(initialValue);
  useEffect(() => {
    console.log("initialValue", initialValue);
  }, []);
  useEffect(() => {
    console.log("test", initialValue);

    setInputValue(initialValue);
  }, [initialValue]);
  const getSuggestions = async (value) => {
    // console.log("value", value);
    // const inputValue = value.trim().toLowerCase();
    // const inputLength = value.length;

    // return inputLength === 0
    //   ? []
    //   : languages.filter(
    //       (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    const { data } = await api.post("/users/search/", {
      searchText: inputValue,
    });

    return data;
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(await getSuggestions(inputValue));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => {
    return (
      <div className="flex items-center p-2 border-b  border-b-shades-200 cursor-pointer">
        <div className="w-[180px]">
          {suggestion.firstName} {suggestion.lastName}
        </div>
        <div className="w-[200px]">{suggestion.email}</div>
        <div className="w-[120px]">{suggestion.phone}</div>
        <div className="w-[100px]">{suggestion.idNumber}</div>
      </div>
    );
  };

  const getSuggestionValue = (suggestion) => suggestion.firstName;

  const onChange = (event, { newValue }) => {
    setInputValue(newValue);
    // inputValue = newValue;
  };

  const inputProps = {
    placeholder: "Select user",
    value: inputValue,
    onChange: onChange,
  };

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    onSelected(suggestion);
    inputValue = `${suggestion.firstName} ${suggestion.lastName}`;
  };
  return (
    <div className="relative">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};

export default UserSwitcher;
