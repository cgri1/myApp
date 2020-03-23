import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Pages from "./pages"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const MyApp = () => (
  <MuiThemeProvider>
    <Pages />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  document.getElementById("root")
);

