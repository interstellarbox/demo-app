import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store, { StoreProvider } from "./stores/rootStore";
import { jobs } from "./fixtures/fixtureData";

const root = ReactDOM.createRoot(document.getElementById("root"));

//initiate a store with a fixture data.
const store = new Store({ jobs: jobs });

root.render(
  <React.StrictMode>
    {/* make rootStore accessible for all components by using useStore hook*/}
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
