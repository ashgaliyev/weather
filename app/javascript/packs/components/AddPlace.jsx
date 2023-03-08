import React from "react";
import PropTypes from "prop-types";

const AddPlace = ({ onClick }) => {
  return (
    <div
      class="group max-w-sm bg-white rounded-lg flex flex-col items-center justify-center border-dashed border-2 border-gray-400 hover:cursor-pointer min-h-[120px]"
      onClick={onClick}
    >
      <span class="text-2xl text-gray-400 group-hover:text-gray-500">
        New Place
      </span>
    </div>
  );
};

export default AddPlace;
