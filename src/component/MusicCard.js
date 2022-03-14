import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
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

  componentDidMount() {
    this.musicAlbum();
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

  favoriteMusic = async () => {
    this.setState({ loading: true });
    const returnFavorite = await addSong();
    this.setState({ favorites: returnFavorite, loading: false });
  }

  render() {
    const { listAlbum, artistAlbum, nameAlbum, loading, favorites } = this.state;
    return (
      <>
        <p data-testid="artist-name">{ artistAlbum }</p>
        <p data-testid="album-name">{ nameAlbum }</p>
        {loading ? <Loading /> : favorites}
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
                      onChange={ this.favoriteMusic }
                    />
                  </label>
                </div>)))
        }
      </>
    );
  }
}

MusicCard.propType = {
  id: PropTypes.string.isRequired,
  valueInputArtist: PropTypes.string.isRequired,
  artistAlbum: PropTypes.string.isRequired,
};

export default MusicCard;
