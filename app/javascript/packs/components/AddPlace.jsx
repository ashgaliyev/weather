import React from "react";

const AddPlace = ({ onClick }) => {
  return (
    <div
      className="group max-w-sm bg-white rounded-lg flex flex-col items-center justify-center border-dashed border-2 border-gray-400 hover:cursor-pointer min-h-[120px]"
      onClick={onClick}
    >
      <span className="text-2xl text-gray-400 group-hover:text-gray-500">
        New Place
      </span>
    </div>
  );
};

export default AddPlace;
