import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { isEmpty } from '../utils/func';
import { fetchAlbumPlaylist, clearPlaylist } from '../actions/album';

class AlbumPlaylist extends React.Component {
  componentDidMount() {
    const { title, id } = this.props.params;

    if (!isEmpty(this.props.playlist)) {
      // Clear the the previous playlist data in the store
      this.props.clearPlaylist();
    }

    this.props.fetchAlbumPlaylist(title, id);
  }

  render() {
    return (
      <Pages.AlbumPlaylist playlist={this.props.playlist} />
    );
  }
}

function mapStateToProps(state) {
  const playlist = state.albumState.playlist;

  return { playlist };
}

export default connect(mapStateToProps,
{ fetchAlbumPlaylist, clearPlaylist })(AlbumPlaylist);
