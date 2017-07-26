import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components';
import { changeActiveChart } from '../actions/chart';
import { addSongToQueue } from '../actions/queue';
import { toggleTrackDropDown, toggleModal } from '../actions/ui';
import { download, fetchTracks } from '../actions/home';
import { addSongToStoreTemporarily } from '../actions/user_playlist';

class HomePageContainer extends Component {
  render() {
    return (
      <HomePage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { activeChart } = state.chartState;
  const { isLoading, tracks } = state.trackState;
  const { authenticated } = state.auth;

  return {
    chart: state.chartState[activeChart],
    show: state.UIState.dropDown.show,
    downloadProgress: state.UIState.downloadProgress,
    dropDownActiveId: state.UIState.dropDown.activeId,
    isLoading,
    tracks,
    authenticated,
  };
}

export default connect(mapStateToProps,
  {
    changeActiveChart,
    addSongToQueue,
    toggleTrackDropDown,
    download,
    fetchTracks,
    toggleModal,
    addSongToStoreTemporarily,
  })(HomePageContainer);

