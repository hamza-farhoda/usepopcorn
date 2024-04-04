import React from "react";
import { useState, useEffect } from "react";

export default function useLocalStorage(initialState, key) {
  const [value, setvalue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value), [value]);
    },
    [value, key]
  );
  return [value, setvalue];
}
