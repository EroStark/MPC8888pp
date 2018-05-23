import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Beat from "./Components/Beat/beat"

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Beat} />
        </Switch>
      </div>
    );
  }
}

export default App;
