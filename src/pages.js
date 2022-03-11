import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Search from './search';
import Album from './album';
import Favorites from './favorites';
import Profile from './profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';
import Loading from './Loading';

class Pages extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/Loading" component={ Loading } />
        <NotFound />
      </div>
    );
  }
}

export default Pages;
