import * as React from "react";
import PlaceForm from "./components/PlaceForm";
import { placeFormShape } from "./utils/types";
import Page from "./components/Page";
import Navigation from "./components/Navigation";
import { SettingsContext } from "./components/SettingsProvider";
import renderApp from "./utils/renderApp";
import { deletePlace } from "./utils/api";

function EditPlace({ place }) {
  const { buildUrl } = React.useContext(SettingsContext);
  return (
    <Page
      heading="Edit place"
      topBlockLeft={
        <Navigation
          links={[
            { name: "← Back", url: buildUrl.rootUrl() },
            {
              name: "Delete",
              onClick: () => {
                // eslint-disable-next-line no-restricted-globals, no-alert
                if (confirm("Are you sure?")) {
                  deletePlace(place).then(() => {
                    window.location.href = buildUrl.rootUrl();
                  });
                }
              },
            },
          ]}
        />
      }
      content={
        <PlaceForm
          place={place}
          onSubmit={() => {
            window.location.href = buildUrl.rootUrl();
          }}
        />
      }
    />
  );
}

EditPlace.propTypes = {
  place: placeFormShape.isRequired,
};

renderApp(EditPlace);
