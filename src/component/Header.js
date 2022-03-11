import React from 'react';
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
        Header
        <p data-testid="header-user-name">{name}</p>
        { loading && <Loading />}
      </header>
    );
  }
}

export default Header;
