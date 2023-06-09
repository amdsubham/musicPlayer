// @flow

import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import ErrorMessage from '~/components/common/ErrorMessage';
import _get from 'lodash/get';
import _head from 'lodash/head';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';
import { Creators as PlaylistsCreators } from '~/store/ducks/playlist';

import CONSTANTS from '~/utils/CONSTANTS';
import { getItemFromStorage } from '~/utils/AsyncStorageManager';
import useGetOnboardingStatus from '~/utils/useGetOnboardingStatus';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

type Props = {
  loadPodcastsRecentlyPlayed: Function,
  setPodcastsDownloadedList: Function,
  loadPlaylists: Function,
  navigation: Object,
};

const BLOCKER_RESPONSE = {
  should_block_app: false,
  message: '',
};
class StaterScreen extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      screenBlockerStatus: BLOCKER_RESPONSE,
    };
  }

  componentDidMount() {
    const {
      loadPodcastsRecentlyPlayed,
      setPodcastsDownloadedList,
      loadPlaylists,
      navigation,
    } = this.props;

    setPodcastsDownloadedList();

    loadPodcastsRecentlyPlayed();

    loadPlaylists();

    this.loadImages();

    SplashScreen.hide();
    // this.fetchBlockerData();
    navigation.navigate(CONSTANTS.ROUTES.INTERESTS);
  }
  fetchBlockerData = async () => {
    const { navigation } = this.props;
    const { isFirstLaunch } = useGetOnboardingStatus();
    axios
      .get('http://31.220.21.195:3002/mind-cast/api/v1/blocker')
      .then((response) => {
        const { data } = response;
        if (_get(_head(data), 'should_block_app', false) === true) {
          this.setState({ screenBlockerStatus: _head(data) });
        } else {
          // if intrest is there then route it to main stack else route it to intrest stack

          if (isFirstLaunch) {
            navigation.navigate(CONSTANTS.ROUTES.INTERESTS);
          } else {
            navigation.navigate(CONSTANTS.ROUTES.MAIN_STACK);
          }
          // navigation.navigate(CONSTANTS.ROUTES.INTERESTS);
        }
      })
      .catch(() => {
        this.setState({ screenBlockerStatus: BLOCKER_RESPONSE });
      });
  };
  loadImages = (): void => {
    FastImage.preload([
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/history/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/pop-culture/big.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/science/big.jpeg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/philosofy/big.jpg',
      },
      {
        uri:
          'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/categories%2Fcategories.png?alt=media&token=c443acca-c94a-4f4b-8812-d3e6bbd272d9.png',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/categories/all/all.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/mind-cast/images/background-image.jpg',
      },
      {
        uri:
          'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/user-profile/user-profile.jpg',
      },
    ]);
  };

  render() {
    const { screenBlockerStatus } = this.state;
    if (_get(screenBlockerStatus, 'should_block_app', false)) {
      return (
        <Wrapper>
          <ErrorMessage
            message={_get(screenBlockerStatus, 'message', '')}
            icon="update"
            title="Oops..."
          />
        </Wrapper>
      );
    }
    return <Fragment />;
  }
}

const Creators = Object.assign(
  {},
  LocalPodcastsManagerCreators,
  PlaylistsCreators,
  PlayerCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(StaterScreen);
