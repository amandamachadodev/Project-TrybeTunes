import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Search from './search';
import Album from './album';
import Favorites from './favorites';
import Profile from './profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

class Pages extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <NotFound />
      </div>
    );
  }
}

export default Pages;
