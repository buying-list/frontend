import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ItemList from "./pages/ItemList";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ItemList} />
      </Switch>
    </BrowserRouter>
  );
}
