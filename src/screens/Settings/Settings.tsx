import React, { useMemo } from 'react';
import Text from '../../components/Text/Text';
import Layout from '../../components/Layout/Layout';
import { Appearance, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '../../theme/theme.interface';
import SwitchOption from '../../components/Switch/SwitchOption';

const Settings = () => {
  const isLight = Appearance.getColorScheme() === 'light';
  const theme = useTheme() as ITheme;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <Layout title="Settings">
      <View style={styles.container}>
        <Text lg bold>
          Update Settings
        </Text>
        <View style={styles.optionContainer}>
          <SwitchOption
            icon="palette"
            label="Color Theme"
            isActive={isLight}
            onChange={(_val: boolean) =>
              Appearance.setColorScheme(isLight ? 'dark' : 'light')
            }
          />
        </View>
      </View>
    </Layout>
  );
};

export default Settings;

const createStyle = (theme: ITheme) => {
  const { padding, margin } = theme;
  return StyleSheet.create({
    container: {
      padding: padding.lg,
    },
    optionContainer: {
      marginVertical: margin.xlg,
    },
  });
};
