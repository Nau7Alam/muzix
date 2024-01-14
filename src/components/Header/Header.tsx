import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITheme } from '../../theme/theme.interface';
import { useTheme } from '@react-navigation/native';

export const Header = () => {
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);
  return (
    <View style={styles.continer}>
      <View>
        <Text>III</Text>
      </View>
      <View>
        <Text style={styles.title}>Muzix</Text>
      </View>
      <View>
        <Text>VV</Text>
      </View>
    </View>
  );
};

export default Header;

const createStyle = (theme: ITheme) => {
  const { colors, padding, fontSize } = theme;
  return StyleSheet.create({
    continer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      padding: padding.lg,
    },
    title: {
      fontSize: fontSize.default,
    },
  });
};
