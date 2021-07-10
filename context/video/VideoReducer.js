import {
  SET_MEDIA_PRESENT,
  SET_LOADING,
  SET_PERCENTAGE_COMPLETION,
  SET_VIDEO,
  SET_VIDEO_DURATION,
} from '../types';

const VideoReducer = (state, action) => {
  switch (action.type) {
    case SET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };
    case SET_VIDEO_DURATION:
      return {
        ...state,
        videoDuration: action.payload,
      };
    case SET_MEDIA_PRESENT:
      return {
        ...state,
        mediaPresent: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_PERCENTAGE_COMPLETION:
      return {
        ...state,
        percentageCompletion: action.payload,
      };

    default:
      return state;
  }
};

export default VideoReducer;
