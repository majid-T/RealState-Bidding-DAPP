import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Owner from "./components/Owner";
import Realtor from "./components/Realtor";
import Bidder from "./components/Bidder";
import Buyer from "./components/Buyer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <div className="mainPanel">
        <Switch>
          <Route exact path="/" component={Owner} />
          <Route path="/Realtor" component={Realtor} />
          <Route path="/Bidder" component={Bidder} />
          <Route path="/Buyer" component={Buyer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
