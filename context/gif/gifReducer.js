import {
  SET_GIF,
  SET_GIF_END,
  SET_GIF_START,
  SET_LOADING,
  SET_PERCENTAGE_COMPLETION,
  SET_VIDEO,
  SET_VIDEO_DURATION,
} from '../types';

const GifReducer = (state, action) => {
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
    case SET_GIF:
      return {
        ...state,
        gif: action.payload,
      };
    case SET_GIF_START:
      return {
        ...state,
        gifStart: action.payload,
      };
    case SET_GIF_END:
      return {
        ...state,
        gifEnd: action.payload,
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

export default GifReducer;
