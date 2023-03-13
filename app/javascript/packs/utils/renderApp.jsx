import { createRoot } from "react-dom/client";
import * as React from "react";
import SettingsProvider from "../components/SettingsProvider";

const renderApp = App => {
  const props = window.props ? JSON.parse(window.props) : {};
  const settings = window.settings ? JSON.parse(window.settings) : {};

  const container = document.getElementsByTagName("main")[0];
  const root = createRoot(container);

  root.render(
    <SettingsProvider {...settings}>
      <App {...props} />
    </SettingsProvider>
  );
};

export default renderApp;
