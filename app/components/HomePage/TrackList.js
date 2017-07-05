import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';


function TrackList(props) {
  return (
    <div className='hp-track-list-wrapper'>
      <ul className='hp-track-list'>
        { props.tracks.map(track => <Track key={track.id} {...track} {...props}/>) }
        { props.isLoading && <div className='loader'></div> }
      </ul>
    </div>
  );
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TrackList;

