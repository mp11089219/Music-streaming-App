import * as types from '../constant/action_constant';

const initialState = {
  showAnalyzer: false,
  dropDown: { activeId: '', show: false },
  showQueue: false,
  slideInRight: false,
  downloadProgress: {
    isDownloading: false,
    id: '',
    percent: 0,
  },
};


export default function (state = initialState, action) {
  switch (action.type) {
  case types.SHOW_ANALYZER:
    return { ...state, showAnalyzer: true };

  case types.HIDE_ANALYZER:
    return { ...state, showAnalyzer: false };

  case types.TOGGLE_TRACK_DROPDOWN:
    return toggleTrackDropDown(state, action);

  case types.TOGGLE_QUEUE:
    return { ...state, showQueue: !state.showQueue };

  case types.SLIDE_IN_RIGHT:
    return { ...state, slideInRight: true };

  case types.RESET_SLIDE_IN_RIGHT:
    return { ...state, slideInRight: false };

  case types.START_DOWNLOADING:
    return {
      ...state,
      downloadProgress: {
        isDownloading: true,
        id: action.id,
        percent: 0,
      },
    };

  case types.UPDATE_DOWNLOAD_PROGRESS:
    return { ...state, downloadProgress: { ...state.downloadProgress, percent: action.percent } };

  case types.FINISH_DOWNLOADING:
    return {
      ...state,
      downloadProgress: {
        isDownloading: false,
        id: '',
      },
    };

  default:
    return state;
  }
}

function toggleTrackDropDown(state, action) {
  const { activeId } = action.dropDown;

  return {
    ...state,
    dropDown: {
      activeId: activeId !== state.dropDown.activeId ? activeId : '',
      show: activeId !== state.dropDown.activeId,
    },
  };
}
