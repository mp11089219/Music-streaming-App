import { store } from './index.js';
import { fetchTracks } from './actions/home';
import { getChart } from './actions/chart';

export function fetchDefaultTracks() {
  const tracks = store.getState().trackState.tracks;

  store.dispatch(getChart('pop'));

  if (!tracks.length) {
    // only fetch tracks if there is no tracks in the trackState
    return store.dispatch(fetchTracks());
  }

  return null;
}