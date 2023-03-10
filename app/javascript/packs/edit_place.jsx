import { createRoot } from "react-dom/client";
import * as React from "react";
import PropTypes from "prop-types";
import PlaceForm from "./components/PlaceForm";
import { placeFormShape } from "./utils/types";
import Page from "./components/Page";
import Navigation from "./components/Navigation";

const EditPlace = (props) => {
  return (
    <Page
      heading={"Edit place"}
      topBlockLeft={
        <Navigation
          links={[
            { name: "← Back", url: "/" },
            {
              name: "Delete",
              onClick: () => {
                if (confirm("Are you sure?")) {
                  deletePlace(props.place).then(() => {
                    window.location.href = "/";
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
            window.location.href = "/";
          }}
        />
      }
    />
  );
};

EditPlace.propTypes = {
  place: placeFormShape,
};

document.addEventListener("DOMContentLoaded", () => {
  const props = JSON.parse(window.props);

  const container = document.getElementsByTagName("main")[0];
  const root = createRoot(container);
  root.render(<EditPlace {...props} />);
});
