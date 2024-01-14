import { Dimensions } from 'react-native';

export enum SpaceSize {
  zero = 0,
  two = 2,
  four = 4,
  six = 6,
  eight = 8,
  ten = 10,
  md = 12,
  lg = 16,
  xlg = 24,
  xxlg = 32,
  full = 500,
}

export enum FontSize {
  xxxs = 8,
  xxs = 10,
  xs = 12,
  sm = 14,
  md = 16,
  default = 18,
  lg = 24,
  xxl = 32,
  xxxl = 48,
}

export enum FontWeight {
  thin = '100',
  ultraLight = '200',
  light = '300',
  regular = '400',
  medium = '500',
  semiBold = '600',
  heavy = '700',
  bold = '800',
}

export const FlexAlignments = {
  flexCenter: {
    justifyContent: 'center',
    alingContent: 'center',
  },
  topCenter: {
    alingItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomCenter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
};

export const { width, height } = Dimensions.get('window');
