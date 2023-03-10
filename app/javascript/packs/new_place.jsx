import { createRoot } from "react-dom/client";
import * as React from "react";
import PropTypes from "prop-types";
import PlaceForm from "./components/PlaceForm";
import Page from "./components/Page";
import Navigation from "./components/Navigation";
import renderApp from "./utils/renderApp";
import { SettingsContext } from "./components/SettingsProvider";

const NewPlace = () => {
  const { buildUrl } = React.useContext(SettingsContext);
  return (
    <Page
      heading={"Add a new place"}
      topBlockLeft={
        <Navigation links={[{ name: "← Back", url: buildUrl.rootUrl() }]} />
      }
      topBlockRight={null}
      content={
        <PlaceForm
          onSubmit={() => {
            window.location.href = buildUrl.rootUrl();
          }}
        />
      }
    />
  );
};

renderApp(NewPlace);
