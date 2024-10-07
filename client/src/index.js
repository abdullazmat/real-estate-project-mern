import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App.js";
import "./index.css";
import { persistor, store } from "./Redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
