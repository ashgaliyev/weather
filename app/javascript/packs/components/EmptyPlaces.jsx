import * as React from "react";
import AddPlace from "./AddPlace";

const EmptyPlaces = () => (
  <div className="flex flex-col items-center justify-center my-10">
    <span className="text-2xl mb-5">
      You have no places added. Add a place to get started.
    </span>
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
      }}
    >
      <AddPlace
        onClick={() => {
          window.location.href = `/places/new`;
        }}
      />
    </div>
  </div>
);

export default EmptyPlaces;
