import { useReducer } from 'react';
import VideoContext from './VideoContext';
import VideoReducer from './VideoReducer';
import {
  SET_MEDIA_PRESENT,
  SET_LOADING,
  SET_PERCENTAGE_COMPLETION,
  SET_VIDEO,
  SET_VIDEO_DURATION,
} from '../types';

const VideoState = (props) => {
  const initialState = {
    video: null,
    videoDuration: 0,
    mediaPresent: false,
    loading: false,
    percentageCompletion: 0,
  };

  const [state, dispatch] = useReducer(VideoReducer, initialState);

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
  const setMediaPresent = (mediaPresent) => {
    dispatch({
      type: SET_MEDIA_PRESENT,
      payload: mediaPresent,
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
    <VideoContext.Provider
      value={{
        video: state.video,
        videoDuration: state.videoDuration,
        mediaPresent: state.mediaPresent,
        loading: state.loading,
        percentageCompletion: state.percentageCompletion,
        setVideo,
        setVideoDuration,
        setMediaPresent,
        setLoading,
        setPercentageCompletion,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoState;
