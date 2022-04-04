import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      listAlbum: [],
      artistAlbum: '',
      nameAlbum: '',
      loading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    this.musicAlbum();
    this.musicasFavoritas();
    await getFavoriteSongs();
  }

  // Renderizou o álbum: req 7//
  musicAlbum = async () => {
    const { id } = this.props;
    const objectAlbum = await getMusics(id);
    const artistName = objectAlbum.map((element) => element.artistName)[0];
    const trackName = objectAlbum.map((element) => element.collectionName)[0];
    if (objectAlbum === undefined) {
      console.log('false');
    } else {
      this.setState({ listAlbum: objectAlbum,
        artistAlbum: artistName,
        nameAlbum: trackName });
    }
  }

  // Adiciona música favoritada: req 8

  checkFavoriteMusic = async (element, event) => {
    this.setState({ loading: true });
    console.log(event.target.name);
    if (event.target.checked === true) {
      await addSong(element);
      this.setState({ loading: false }, () => this.musicasFavoritas());
    } else {
      await removeSong(element);
      this.setState({ loading: false }, () => this.musicasFavoritas());
    }
  }

  // checkFavoriteMusic = (marked, event) => {
  //   this.setState({
  //     loading: true,
  //   },
  //   async () => {
  //     if (marked === true) {
  //       await addSong(event.target.name);
  //       const favorite = await getFavoriteSongs();
  //       this.setState({
  //         favorites: favorite,
  //       });
  //       this.setState({
  //         loading: false,
  //       });
  //     }
  //   });
  // }

  // Busca todas as músicas favoritada: req 9

  musicasFavoritas = async () => {
    this.setState({ loading: true });
    const listFavorite = await getFavoriteSongs();
    console.log(listFavorite);
    this.setState({ loading: false, favorites: [...listFavorite, listFavorite] });
  }

  render() {
    const { listAlbum, artistAlbum,
      nameAlbum, loading, favorites } = this.state;
    return (
      <>
        <p data-testid="artist-name">{ artistAlbum }</p>
        <p data-testid="album-name">{ nameAlbum }</p>
        {loading ? <Loading /> : ''}
        {
          listAlbum.map((element) => (
            element.previewUrl === undefined ? ''
              : (
                <div key={ element.trackId }>
                  <p>{element.trackName}</p>
                  <audio
                    data-testid="audio-component"
                    src={ element.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                  </audio>
                  <label htmlFor="check">
                    Favorita
                    <input
                      type="checkbox"
                      data-testid={ `checkbox-music-${element.trackId}` }
                      onChange={ (event) => this.checkFavoriteMusic(element, event) }
                      name={ element.trackId }
                      checked={ favorites.some((item) => (
                        item.trackId === element.trackId)) }
                    />
                  </label>
                </div>)))
        }
      </>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MusicCard;
