import React from 'react';
import Header from '../component/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
    };
  }

  buttonAble = (event) => {
    const artistInput = event.target.value;
    const thwo = 2;
    if (artistInput.length >= thwo) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.buttonAble }
              placeholder="Nome do artista"
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
