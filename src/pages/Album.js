import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';

class Album extends React.Component {
  render() {
    console.log(this.props);
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard id={ id } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
};

export default Album;
