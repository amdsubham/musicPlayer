export const Types = {
  SET_CURRENT_TIME_PODCAST: 'player/SET_CURRENT_TIME_PODCAST',
  PLAY_PODCAST: 'player/PLAY_PODCAST',
  STOP_PODCAST: 'player/STOP_PODCAST',
  NEXT_PODCAST: 'player/NEXT_PODCAST',
  PREVIOUS_PODCAST: 'player/PREVIOUS_PODCAST',
  SET_PODCAST: 'player/SET_PODCAST',
  SET_PODCAST_SUCCESS: 'player/SET_PODCAST_SUCCESS',
};

const podcasts = [
  {
    title: 'OH NANANA',
    id: 1,
    url: 'https://s3-sa-east-1.amazonaws.com/gonative/1.mp3',
  },
  {
    title: 'eu vou cair',
    id: 2,
    path: './cair.mp3',
  },
];

const INITIAL_STATE = {
  currentPodcastURI: null,
  currentTime: '00:00',
  playlist: podcasts,
  playlistIndex: 0,
  paused: true,
  error: false,
};

export const Creators = {
  setPodcast: () => ({
    type: Types.SET_PODCAST,
  }),

  setPodcastSuccess: currentPodcastURI => ({
    type: Types.SET_PODCAST_SUCCESS,
    payload: { currentPodcastURI },
  }),

  setCurrentTime: currentTime => ({
    type: Types.SET_CURRENT_TIME_PODCAST,
    payload: { currentTime },
  }),

  playPodcast: () => ({
    type: Types.PLAY_PODCAST,
  }),

  pausePodcast: () => ({
    type: Types.STOP_PODCAST,
  }),

  nextPodcast: () => ({
    type: Types.NEXT_PODCAST,
  }),

  previousPodcast: () => ({
    type: Types.PREVIOUS_PODCAST,
  }),
};

const parseCurrentPodcastTime = (rawTime) => {
  const currentTime = Math.ceil(rawTime);

  const currentTimeInMinutes = Math.floor(currentTime / 60);
  const currentTimeInSeconds = currentTime % 60;

  let minutes = '00';
  let seconds = '00';

  if (currentTimeInMinutes > 9) {
    minutes = currentTimeInMinutes;
  }

  if (currentTimeInMinutes >= 1 && currentTimeInMinutes <= 9) {
    minutes = `0${currentTimeInMinutes}`;
  }

  if (currentTimeInSeconds > 9 && currentTimeInSeconds <= 59) {
    seconds = currentTimeInSeconds;
  }

  if (currentTimeInSeconds >= 1 && currentTimeInSeconds <= 9) {
    seconds = `0${currentTimeInSeconds}`;
  }

  if (currentTimeInSeconds === 60) {
    seconds = '00';
  }

  return `${minutes}:${seconds}`;
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.SET_PODCAST:
      return {
        ...state,
      };

    case Types.SET_PODCAST_SUCCESS:
      return {
        ...state,
        currentPodcastURI: payload.currentPodcastURI,
      };

    case Types.PLAY_PODCAST:
      return {
        ...state,
        paused: false,
      };

    case Types.STOP_PODCAST:
      return {
        ...state,
        paused: true,
      };

    case Types.SET_CURRENT_TIME_PODCAST:
      return {
        ...state,
        currentTime: parseCurrentPodcastTime(payload.currentTime),
      };

    case Types.PREVIOUS_PODCAST:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default player;