import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount = () => {
    this.callGetUser();
  };

  callGetUser = () => {
    this.setState({ loading: true }, async () => {
      const nome = await getUser();
      this.setState({ name: nome.name, loading: false });
    });
  };

  render() {
    const { loading, name } = this.state;
    // const { nameLogin } = this.props;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{name}</p>
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
        { loading && <Loading />}
      </header>
    );
  }
}

export default Header;
