import React, { createContext, useState } from "react";

export const TempContext = createContext();

const TempProvider = ({ children }) => {
  const [tempType, setTempType] = useState("Celsius");

  const toggleTempType = () => {
    setTempType(tempType === "Celsius" ? "Fahrenheit" : "Celsius");
  };

  return (
    <TempContext.Provider value={{ tempType, toggleTempType }}>
      {children}
    </TempContext.Provider>
  );
};

export default TempProvider;
