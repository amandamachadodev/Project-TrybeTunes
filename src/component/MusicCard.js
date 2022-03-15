import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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
      checkListFavorite: '',
      newCheckListFavorite: [],
      check: false,
    };
  }

  async componentDidMount() {
    this.musicAlbum();
    this.musicasFavoritas();
    await getFavoriteSongs();
  }

  musicAlbum = async () => {
    const { id } = this.props;
    const objectAlbum = await getMusics(id);
    const artistName = objectAlbum.map((element) => element.artistName)[0];
    const trackName = objectAlbum.map((element) => element.collectionName)[0];
    if (objectAlbum === undefined) {
      console.log('não');
    } else {
      this.setState({ listAlbum: objectAlbum,
        artistAlbum: artistName,
        nameAlbum: trackName });
    }
  }

  checkFavoriteMusic = async () => {
    this.setState({ loading: true});
    const returnFavorite = await addSong();
    this.setState({ loading: false,
      favorites: returnFavorite });
  }

  musicasFavoritas = async () => {
    this.setState({ loading: true });
    const listFavorite = await getFavoriteSongs();
    console.log(listFavorite);
    this.setState({ loading: false, newCheckListFavorite: listFavorite });
  }

  render() {
    const { listAlbum, artistAlbum, newCheckListFavorite,
      nameAlbum, loading, favorites } = this.state;
    return (
      <>
        <p data-testid="artist-name">{ artistAlbum }</p>
        <p data-testid="album-name">{ nameAlbum }</p>
        {loading ? <Loading /> : ''}
        {
          listAlbum.map((element) => (
            element.previewUrl === undefined ? favorites
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
                      onChange={ this.checkFavoriteMusic }
                      name={ element.trackId }
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
