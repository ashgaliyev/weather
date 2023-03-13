import React, { useContext } from "react";
import * as Switch from "@radix-ui/react-switch";
import { SettingsContext } from "../SettingsProvider";

function TempSwitcher() {
  const { tempType, toggleTempType } = useContext(SettingsContext);

  return (
    <div
      className="flex justify-end items-center"
      style={{ display: "flex", alignItems: "center" }}
    >
      <label
        className="text-black text-[15px] leading-none pr-[15px]"
        htmlFor="airplane-mode"
      >
        {tempType}
      </label>
      <Switch.Root
        className="w-[42px] h-[25px] bg-blackA9 rounded-full relative bg-black outline-none cursor-default"
        id="airplane-mode"
        onCheckedChange={toggleTempType}
        checked={tempType === "Fahrenheit"}
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  );
}

export default TempSwitcher;
