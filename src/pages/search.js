import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      returnArtist: [],
      valueInputArtist: '',
      loading: false,
      button: false,
    };
  }

  componentDidMount() {
    this.searchArtist();
  }

  buttonAble = (event) => {
    const artistInput = event.target.value;
    this.setState({ valueInputArtist: artistInput });
    const thwo = 2;
    if (artistInput.length >= thwo) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  searchArtist = async () => {
    const { valueInputArtist } = this.state;
    this.setState({ loading: true });
    const resultArtistSearch = await searchAlbumsAPI(valueInputArtist);
    if (resultArtistSearch.length > 0) {
      this.setState({ returnArtist: resultArtistSearch,
        loading: false,
        button: true });
    } else {
      this.setState({ loading: false });
    }
    console.log(resultArtistSearch);
  }

  render() {
    const { buttonDisabled,
      returnArtist, valueInputArtist, loading, button } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <div>
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
                  onClick={ this.searchArtist }
                >
                  Pesquisar
                </button>
              </form>
              { button
                ? (
                  <div>
                    <p>{`Resultado de álbuns de: ${valueInputArtist}`}</p>
                  </div>)
                : ''}
              <div>
                {
                  (returnArtist.length === 0) ? <p>Nenhum álbum foi encontrado</p>
                    : returnArtist.map((element) => (
                      <div key={ element.artitId }>
                        <img src={ element.artworkUrl100 } alt={ element.artistName } />
                        <h3>{ element.artistName}</h3>
                        <p>{element.collectionId}</p>
                        <p>{element.collectionName}</p>
                        <p>{element.collectionPrice}</p>
                        <p>{element.releaseDate}</p>
                        <p>{element.trackCount}</p>
                        <Link
                          data-testid={ `link-to-album-${element.collectionId}` }
                          to={ `/album/${element.collectionId}` }
                        >
                          Álbum
                        </Link>
                      </div>))
                }
              </div>
            </div>
          ) }
      </div>
    );
  }
}

export default Search;
