import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './layout/public/publicRoute';
import NoMatch from './layout/noMatch';
import PrivateRoute from './layout/private/PrivateRoute';
import PlayerBoardsPage from './layout/private/PlayerBoardsPage/PlayerBoardsPage';
import CreatePlayerPage from './layout/public/CreatePlayerPage/CreatePlayerPage';
import Game from './layout/private/GamePage/Game';
import Footer from './components/Footer';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute component={CreatePlayerPage} exact path="/" />
          <PrivateRoute component={Game} exact path="/:id/:name/:gameId" />
          <PrivateRoute component={PlayerBoardsPage} exact path="/:id/:name" />
          <Route path="/" component={NoMatch} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
