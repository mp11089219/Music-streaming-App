import store from './store';
import { isEmpty } from './utils/func';
import { fetchTracks } from './actions/home';
import { getChart, changeActiveChart } from './actions/chart';

export function fetchDefaultTracks() {
  const state = store.getState();
  // Only fetch `pop` chart if there isn't one else get it from the state
  if (isEmpty(state.chartState.pop)) {
    store.dispatch(getChart('pop'));
  } else {
    store.dispatch(changeActiveChart('pop'));
  }

  if (!state.trackState.tracks.length) {
    // only fetch tracks if there is no trackss in the trackState
    return store.dispatch(fetchTracks());
  }

  return undefined;
}

function shouldGetChart(charts, type) {
  if (isEmpty(charts[type])) {
    return true;
  } return false;
}

export function getCharts() {
  const state = store.getState();
  const charts = state.chartState;
  if (shouldGetChart(charts, 'pop')) store.dispatch(getChart('pop'));
  if (shouldGetChart(charts, 'kpop')) store.dispatch(getChart('kpop'));
  if (shouldGetChart(charts, 'vpop')) store.dispatch(getChart('vpop'));
}
