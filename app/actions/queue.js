import * as types from '../constant/action_constant';
import { fetchSong } from './song';

export function addSongToQueue(song) {
  const { name, id } = song;
  return (dispatch, getState) => {
    const queue = getState().queueState.queue;

    if (!queue.length) {
      // if the queue doesn't have any songs, fetch this song and play it

      dispatch(fetchSong(name, id));
    } else {
      dispatch({ type: types.ADD_SONG_TO_QUEUE, song });
    }
  };
}

export function togglePushRoute(bool) {
  return {
    type: types.TOGGLE_PUSH_ROUTE,
    flag: bool,
  };
}

export function replaceQueue(songs, ids) {
  return {
    types: types.REPLACE_QUEUE,
    songs,
    ids,
  };
}