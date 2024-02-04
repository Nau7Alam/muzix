import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../Button/Button';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../../../theme/theme.interface';
import Text from '../../../Text/Text';

type ConfirmProps = {
  title: string;
  message: string;
  onYes: () => void;
  onNo: () => void;
};
const Confirm = ({ title, message, onYes, onNo }: ConfirmProps) => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <View style={styles.continer}>
      <Text md center semiBold>
        {title}
      </Text>
      <Text sm center regular>
        {message}
      </Text>
      <Button title="No" type="primary" onClick={onNo} />
      <Button title="YES" type="secondary" onClick={onYes} />
    </View>
  );
};

const createStyle = (theme: ITheme) => {
  const { padding } = theme;
  return StyleSheet.create({
    continer: {
      gap: padding.lg,
    },
  });
};

export default Confirm;
