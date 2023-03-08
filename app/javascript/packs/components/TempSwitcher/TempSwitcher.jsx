import React, { useContext } from "react";
import { TempContext } from "../TempProvider";
import * as Switch from "@radix-ui/react-switch";

const TempSwitcher = () => {
  const { tempType, toggleTempType } = useContext(TempContext);

  return (
    <div
      className="flex mb-2 justify-end items-center"
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
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  );
};

export default TempSwitcher;
