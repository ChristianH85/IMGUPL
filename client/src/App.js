import React from "react";
import Nav from "./components/Nav";
import Upform from "./pages/UpForm";
import Gallery from "./pages/Gallery"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Gallery/>
          </Route>
          <Route exact path="/upload">
            <Upform/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
