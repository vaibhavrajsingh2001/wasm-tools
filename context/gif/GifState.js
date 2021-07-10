import { useReducer } from 'react';
import GifContext from './gifContext';
import GifReducer from './gifReducer';
import {
  SET_GIF,
  SET_GIF_END,
  SET_GIF_START,
  SET_LOADING,
  SET_PERCENTAGE_COMPLETION,
  SET_VIDEO,
  SET_VIDEO_DURATION,
} from '../types';

const GifState = (props) => {
  const initialState = {
    video: null,
    videoDuration: 0,
    gif: null,
    gifStart: 0,
    gifEnd: 1,
    loading: false,
    percentageCompletion: 0,
  };

  const [state, dispatch] = useReducer(GifReducer, initialState);

  const setVideo = (video) => {
    dispatch({
      type: SET_VIDEO,
      payload: video,
    });
  };
  const setVideoDuration = (videoDuration) => {
    dispatch({
      type: SET_VIDEO_DURATION,
      payload: videoDuration,
    });
  };
  const setGif = (gif) => {
    dispatch({
      type: SET_GIF,
      payload: gif,
    });
  };
  const setGifStart = (gifStart) => {
    dispatch({
      type: SET_GIF_START,
      payload: gifStart,
    });
  };
  const setGifEnd = (gifEnd) => {
    dispatch({
      type: SET_GIF_END,
      payload: gifEnd,
    });
  };
  const setLoading = (isLoading) => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    });
  };
  const setPercentageCompletion = (percentageCompletion) => {
    dispatch({
      type: SET_PERCENTAGE_COMPLETION,
      payload: percentageCompletion,
    });
  };

  return (
    <GifContext.Provider
      value={{
        video: state.video,
        videoDuration: state.videoDuration,
        gif: state.gif,
        gifStart: state.gifStart,
        gifEnd: state.gifEnd,
        loading: state.loading,
        percentageCompletion: state.percentageCompletion,
        setVideo,
        setVideoDuration,
        setGif,
        setGifStart,
        setGifEnd,
        setLoading,
        setPercentageCompletion,
      }}
    >
      {props.children}
    </GifContext.Provider>
  );
};

export default GifState;
