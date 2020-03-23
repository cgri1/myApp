import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from "./App.js"
import ScrumMasterPage from "./components/scrummaster"
import Developer from "./components/developer.js";

export default function Pages() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route path="/scrummaster">
                    <ScrumMasterPage />
                </Route>
                <Route path="/developer">
                    <Developer />
                </Route>
            </Switch>
        </Router>
    );
}

