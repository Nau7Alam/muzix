import React from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { IconProps } from 'react-native-vector-icons/Icon';

const getIcon = (type: string) => {
  switch (type) {
    case 'octa':
      return Octicons;
    case 'material':
      return MCIcon;
    case 'font':
      return Fontisto;
    default:
      return SimpleLineIcon;
  }
};

type IProps = {
  type: string;
} & IconProps;
const Icon = ({ type, ...rest }: IProps) => {
  const IconComponent = getIcon(type);
  return <IconComponent {...rest} />;
};

export default Icon;
