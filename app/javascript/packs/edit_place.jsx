import * as React from "react";
import PropTypes from "prop-types";
import PlaceForm from "./components/PlaceForm";
import { placeFormShape } from "./utils/types";
import Page from "./components/Page";
import Navigation from "./components/Navigation";
import { SettingsContext } from "./components/SettingsProvider";
import renderApp from "./utils/renderApp";

const EditPlace = (props) => {
  const { buildUrl } = React.useContext(SettingsContext);
  return (
    <Page
      heading={"Edit place"}
      topBlockLeft={
        <Navigation
          links={[
            { name: "← Back", url: buildUrl.rootUrl() },
            {
              name: "Delete",
              onClick: () => {
                if (confirm("Are you sure?")) {
                  deletePlace(props.place).then(() => {
                    window.location.href = buildUrl.rootUrl();
                  });
                }
              },
            },
          ]}
        />
      }
      topBlockRight={null}
      content={
        <PlaceForm
          place={props}
          onSubmit={() => {
            window.location.href = buildUrl.rootUrl();
          }}
        />
      }
    />
  );
};

EditPlace.propTypes = {
  place: placeFormShape,
};

renderApp(EditPlace);
