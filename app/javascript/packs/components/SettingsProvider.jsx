import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { updateTempUnit } from "../utils/api";

export const SettingsContext = createContext();

const LABELS = {
  c: "Celsius",
  f: "Fahrenheit"
};

function SettingsProvider({ children, tempUnit, mapApiKey, paths }) {
  const [tempSym, setTempType] = useState(tempUnit || "c");

  const toggleTempType = () => {
    const newSym = tempSym === "c" ? "f" : "c";
    setTempType(newSym);
    updateTempUnit(newSym);
  };

  const buildUrl = Object.keys(paths).reduce((acc, path) => {
    acc[path.replace("Path", "Url")] = id => {
      if (paths[path].includes(":id")) {
        return paths[path].replace(":id", id);
      }
      return paths[path];
    };
    return acc;
  }, {});

  const value = useMemo(
    () => ({
      tempType: LABELS[tempSym],
      toggleTempType,
      mapApiKey,
      buildUrl
    }),
    [tempSym]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  tempUnit: PropTypes.string.isRequired,
  mapApiKey: PropTypes.string.isRequired,
  paths: PropTypes.objectOf(PropTypes.string).isRequired
};

export default SettingsProvider;
