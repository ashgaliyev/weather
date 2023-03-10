import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { updateTempUnit } from "../utils/api";

export const SettingsContext = createContext();

const LABELS = {
  c: "Celsius",
  f: "Fahrenheit",
};

const SettingsProvider = ({ children, tempUnit, mapApiKey, paths }) => {
  const [tempSym, setTempType] = useState(tempUnit || "c");

  const toggleTempType = () => {
    const newSym = tempSym === "c" ? "f" : "c";
    setTempType(newSym);
    updateTempUnit(newSym);
  };

  const buildUrl = Object.keys(paths).reduce((acc, path) => {
    acc[path.replace("Path", "Url")] = function (id) {
      if (paths[path].includes(":id")) {
        return paths[path].replace(":id", id);
      } else {
        return paths[path];
      }
    };
    return acc;
  }, {});

  return (
    <SettingsContext.Provider
      value={{ tempType: LABELS[tempSym], toggleTempType, mapApiKey, buildUrl }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  tempUnit: PropTypes.string,
  mapApiKey: PropTypes.string,
  places: PropTypes.arrayOf(PropTypes.string),
};

export default SettingsProvider;
