import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';

class Album extends React.Component {
  render() {
    const { id } = this.props.match.params;
    const { valueInputArtist } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard id={ id } valueInputArtist={ valueInputArtist } />
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  valueInputArtist: PropTypes.string.isRequired,
};

export default Album;
