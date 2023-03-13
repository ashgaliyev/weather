import * as React from "react";
import PlaceForm from "./components/PlaceForm";
import Page from "./components/Page";
import Navigation from "./components/Navigation";
import renderApp from "./utils/renderApp";
import { SettingsContext } from "./components/SettingsProvider";

function NewPlace() {
  const { buildUrl } = React.useContext(SettingsContext);
  return (
    <Page
      heading="Add a new place"
      topBlockLeft={
        <Navigation links={[{ name: "← Back", url: buildUrl.rootUrl() }]} />
      }
      content={
        <PlaceForm
          onSubmit={() => {
            window.location.href = buildUrl.rootUrl();
          }}
        />
      }
    />
  );
}

renderApp(NewPlace);
