// @flow

import React from 'react';
import { FlatList } from 'react-native';

import SubjectsListItem from './SubjectListItem';
import CONSTANTS from '~/utils/CONSTANTS';

const items = [
  {
    id: 'traditional',
    title: 'TRADITIONAL',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Ftraditional600x400.png?alt=media&token=d60d372f-57ea-4ce3-a951-791f43b7b985',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Ftraditional80x60.png?alt=media&token=50903777-fdd9-4482-92f0-383fab379e20',
  },
  {
    id: 'semi traditional',
    title: 'SEMI TRADITIONAL',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fsemi-traditional600x400.png?alt=media&token=53d8c430-ca49-4a10-8fdf-17df9e7f6d2b',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fsemi-traditional80x60.png?alt=media&token=7ba57be2-19b9-486b-a231-9674a4317d60',
  },
  {
    id: 'modern',
    title: 'MODERN',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fmodern600x400.png?alt=media&token=521726a7-9bba-4bfc-aabd-a10458b6e4db',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fmodern80x60.png?alt=media&token=edf80633-9829-459e-b857-e90746548f6c',
  },
  {
    id: 'old',
    title: 'OLD',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fold600x400.png?alt=media&token=c1f555e3-d798-4d4b-a716-77176509f4a4',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fold80x60.png?alt=media&token=4ff15f38-2b2f-4d40-8c9b-24b959b15548',
  },
  {
    id: 'romantic',
    title: 'ROMANTIC',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fromantic600x400.png?alt=media&token=6d6b3314-717f-4a68-92eb-06a34ac4501d',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fromantic80x60.png?alt=media&token=5b462185-3fa9-4736-b4fe-39cdccd54a8e',
  },
  {
    id: 'sad',
    title: 'SAD',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fsad600x400.png?alt=media&token=f4a77e94-5d87-480d-8049-6cba06897cef',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fsad80x60.png?alt=media&token=fba8a3d1-deec-4935-97ea-c897e246285f',
  },
  {
    id: 'dong',
    title: 'DONG',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fdong600x400.png?alt=media&token=8d2ebc42-d791-4ca0-aa57-98461a01590e',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fdong80x60.png?alt=media&token=4f681149-ef21-482c-a4db-4c3e93f0f7d0',
  },
  {
    id: 'lagne',
    title: 'LAGNE',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Flagne600x400.png?alt=media&token=b942c3ed-1329-4c17-8900-70db051cb68a',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Flagne80x60.png?alt=media&token=846c2dda-c899-430e-878c-8438c1892131',
  },
  {
    id: 'baha',
    title: 'BAHA',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fbaha600x400.png?alt=media&token=504f3cf8-c6fa-4022-b3c9-d2c214aa0d26',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fbaha80x60.png?alt=media&token=ead77798-5c6b-4051-a106-387aa908e4a4',
  },
  {
    id: 'sohrai',
    title: 'SOHRAI',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fsohrai600x400.png?alt=media&token=f1117d00-e4bd-4770-8c47-823d0a608523',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fsohrai80x60.png?alt=media&token=682b11f5-844c-4817-8ba4-c053d0675994',
  },
  {
    id: 'dasai',
    title: 'DASAI',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fdasai600x400.png?alt=media&token=b75c31ac-b656-443e-ad61-9761701850b2',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fdasai80x60.png?alt=media&token=bae5689f-3c77-4f4a-ba38-72951366b935',
  },
  {
    id: 'nehor',
    title: 'NEHOR',
    imageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories600x400%2Fnehor600x400.png?alt=media&token=72572d88-b49e-4aab-9ca7-d44e782cff23',
    thumbnailImageURL:
      'https://firebasestorage.googleapis.com/v0/b/musicplayer-4e559.appspot.com/o/raha%2Fcategories%2Fcategories80x60%2Fnehor80x60.png?alt=media&token=20b25414-a908-4703-9c3c-8cc792041a06',
  },
];

type Props = {
  isTextInputFocused: boolean,
  navigation: Object,
};

const SubjectsList = ({
  isTextInputFocused,
  navigation,
  shouldUseThumbnailImage = false,
}: Props): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <SubjectsListItem
        onPress={() => {
          navigation.navigate(CONSTANTS.ROUTES.SUBJECT_DETAIL, {
            [CONSTANTS.PARAMS.SUBJECT_DETAIL]: item,
          });
        }}
        isTextInputFocused={isTextInputFocused}
        imageURL={
          shouldUseThumbnailImage ? item.thumbnailImageURL : item.imageURL
        }
        title={item.title}
        index={index}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    numColumns={2}
    data={items}
  />
);

export default SubjectsList;
