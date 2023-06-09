// @flow

import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '~/utils/CONSTANTS';
import {
  getItemFromStorage,
  persistItemInStorage,
} from '~/utils/AsyncStorageManager';

import InterestsListItem from './InterestsListItem';

const DEFAULT_INTERESTS = [
  {
    isSelected: true,
    title: 'ALL',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fall600x400.png?alt=media&token=54963832-1977-48cb-87db-f2508e7e33ce',
  },
  {
    isSelected: false,
    title: 'TRADITIONAL',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Ftraditional600x400.png?alt=media&token=d60d372f-57ea-4ce3-a951-791f43b7b985',
  },
  {
    isSelected: false,
    title: 'SEMI TRADITIONAL',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fsemi-traditional600x400.png?alt=media&token=53d8c430-ca49-4a10-8fdf-17df9e7f6d2b',
  },
  {
    isSelected: false,
    title: 'MODERN',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fmodern600x400.png?alt=media&token=521726a7-9bba-4bfc-aabd-a10458b6e4db',
  },
  {
    isSelected: false,
    title: 'OLD',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fold600x400.png?alt=media&token=c1f555e3-d798-4d4b-a716-77176509f4a4',
  },
  {
    isSelected: false,
    title: 'ROMANTIC',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fromantic600x400.png?alt=media&token=6d6b3314-717f-4a68-92eb-06a34ac4501d',
  },
  {
    isSelected: false,
    title: 'SAD',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fsad600x400.png?alt=media&token=f4a77e94-5d87-480d-8049-6cba06897cef',
  },
  {
    isSelected: false,
    title: 'DONG',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fdong600x400.png?alt=media&token=8d2ebc42-d791-4ca0-aa57-98461a01590e',
  },
  {
    isSelected: false,
    title: 'LAGNE',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Flagne600x400.png?alt=media&token=b942c3ed-1329-4c17-8900-70db051cb68a',
  },
  {
    isSelected: false,
    title: 'BAHA',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fbaha600x400.png?alt=media&token=504f3cf8-c6fa-4022-b3c9-d2c214aa0d26',
  },
  {
    isSelected: false,
    title: 'SOHRAI',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fsohrai600x400.png?alt=media&token=f1117d00-e4bd-4770-8c47-823d0a608523',
  },
  {
    isSelected: false,
    title: 'DASAI',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fdasai600x400.png?alt=media&token=b75c31ac-b656-443e-ad61-9761701850b2',
  },
  {
    isSelected: false,
    title: 'NEHOR',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fnehor600x400.png?alt=media&token=72572d88-b49e-4aab-9ca7-d44e782cff23',
  },
];

type Interest = {
  isSelected: boolean,
  imageURL: string,
  title: string,
};

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ListText = styled(Text)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.1};
  font-family: CircularStd-Medium;
  color: ${({ theme }) => theme.colors.textColor};
  text-align: center;
`;

type State = {
  interests: Array<Interest>,
};

class Interests extends Component<{}, State> {
  state = {
    interests: [],
  };

  async componentDidMount() {
    const rawInterests = await getItemFromStorage(
      CONSTANTS.KEYS.INTERESTS_STORAGE_KEY,
      [],
    );

    const interests = typeof rawInterests === 'string'
      ? JSON.parse(rawInterests)
      : rawInterests;

    if (interests.length === 0) {
      this.setState({
        interests: DEFAULT_INTERESTS,
      });

      await persistItemInStorage(
        CONSTANTS.KEYS.INTERESTS_STORAGE_KEY,
        DEFAULT_INTERESTS,
      );
    }

    if (interests.length > 0) {
      this.setState({
        interests,
      });
    }
  }

  async componentDidUpdate() {
    const { interests } = this.state;

    await persistItemInStorage(CONSTANTS.KEYS.INTERESTS_STORAGE_KEY, interests);
  }

  handleStateOptionAll = (interests: Array<Object>): Object => {
    const hasSomeSubjectSelected = interests.some(
      interest => interest.title !== 'ALL' && interest.isSelected === true,
    );

    if (!hasSomeSubjectSelected) {
      return {
        ...interests[0],
        isSelected: true,
      };
    }

    return interests[0];
  };

  onSelectItem = (indexSelected: number): void => {
    const { interests } = this.state;

    if (indexSelected === 0) {
      const selectedIntrest = interests.map(interest => (interest.title === 'ALL'
        ? { ...interest, isSelected: true }
        : { ...interest, isSelected: false }));

      this.setState({ interests: selectedIntrest });
      return;
    }

    const interestsWithoutFirstOptionChecked = interests.map(
      (interest, index) => {
        if (index === 0 && !interests[indexSelected].isSelected) {
          return {
            ...interest,
            isSelected: false,
          };
        }

        if (index === indexSelected) {
          return {
            ...interest,
            isSelected: !interest.isSelected,
          };
        }

        return interest;
      },
    );

    const optionAllState = this.handleStateOptionAll(
      interestsWithoutFirstOptionChecked,
    );

    const indexAllOption = 0;

    const interestsUpdated = Object.assign(
      [...interestsWithoutFirstOptionChecked],
      {
        [indexAllOption]: optionAllState,
      },
    );

    this.setState({
      interests: interestsUpdated,
    });
  };

  render() {
    const { interests } = this.state;

    return (
      <Wrapper>
        <ListText>Choose the topics that you're interested in.</ListText>
        <FlatList
          renderItem={({ item, index }) => (
            <InterestsListItem
              onPressItem={() => this.onSelectItem(index)}
              isSelected={item.isSelected}
              imageURL={item.imageURL}
              title={item.title}
              index={index}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={interest => `${interest.title}`}
          data={interests}
        />
      </Wrapper>
    );
  }
}

export default Interests;
