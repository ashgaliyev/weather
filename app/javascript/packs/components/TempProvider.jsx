import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { updateTempUnit } from "../api";

export const TempContext = createContext();

const LABELS = {
  c: "Celsius",
  f: "Fahrenheit",
};

const TempProvider = ({ children, tempUnit }) => {
  const [tempSym, setTempType] = useState(tempUnit || "c");

  const toggleTempType = () => {
    const newSym = tempSym === "c" ? "f" : "c";
    setTempType(newSym);
    updateTempUnit(newSym);
  };

  return (
    <TempContext.Provider value={{ tempType: LABELS[tempSym], toggleTempType }}>
      {children}
    </TempContext.Provider>
  );
};

TempProvider.propTypes = {
  children: PropTypes.node.isRequired,
  tempUnit: PropTypes.string,
};

export default TempProvider;
