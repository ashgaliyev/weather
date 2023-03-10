import { createRoot } from "react-dom/client";
import * as React from "react";
import PropTypes from "prop-types";
import PlaceForm from "./components/PlaceForm";
import Page from "./components/Page";
import Navigation from "./components/Navigation";

const NewPlace = () => {
  return (
    <Page
      heading={"Add a new place"}
      topBlockLeft={<Navigation links={[{ name: "← Back", url: "/" }]} />}
      topBlockRight={null}
      content={
        <PlaceForm
          onSubmit={() => {
            window.location.href = "/";
          }}
        />
      }
    />
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementsByTagName("main")[0];
  const root = createRoot(container);
  root.render(<NewPlace />);
});
