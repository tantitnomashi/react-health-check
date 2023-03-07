import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ServerStatus from "./ServerStatus";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/server-status">
          <ServerStatus />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
