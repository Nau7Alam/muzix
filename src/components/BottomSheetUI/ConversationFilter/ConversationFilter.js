import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';

const createStyles = theme => {
  const { padding, borderRadius } = theme;
  return StyleSheet.create({
    bottomSheet: {
      flex: 1,
      paddingHorizontal: padding.six,
    },
    iconNameWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomSheetView: {
      marginTop: padding.four,
      paddingBottom: padding.lg,
    },
    bottomSheetItem: {
      flexDirection: 'row',
      paddingVertical: padding.lg,
      paddingHorizontal: padding.lg,
      borderBottomWidth: 0.4,
      borderRadius: borderRadius.sm,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconWrapper: {
      marginRight: padding.lg,
    },
  });
};

const propTypes = {
  title: PropTypes.string,
  activeValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  leftIcon: PropTypes.string,
  items: PropTypes.array,
  closeFilter: PropTypes.func,
  onChangeFilter: PropTypes.func,
  colors: PropTypes.object,
};

const ConversationFilter = ({
  colors,
  activeValue,
  leftIcon,
  items,
  onChangeFilter,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.bottomSheetView}>
        {items.map(item => (
          <Pressable
            key={item.key}
            style={[
              {
                borderBottomColor: colors.borderLight,
                backgroundColor:
                  activeValue === item.key
                    ? colors.primaryColorLight
                    : colors.white,
              },
              styles.bottomSheetItem,
            ]}
            onPress={() => {
              onChangeFilter(item);
            }}
          >
            <View style={styles.iconNameWrapper}>
              {leftIcon && (
                <View style={styles.iconWrapper}>
                  <Icon name={leftIcon} color={colors.black} size={16} />
                </View>
              )}
              <Text sm medium color={colors.text}>
                {item.name}, {(activeValue === item.key).toString()}
              </Text>
            </View>
            <View>
              {activeValue === item.key && (
                <Icon
                  type="font"
                  name="check"
                  color={colors.textDark}
                  size={26}
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

ConversationFilter.propTypes = propTypes;
export default ConversationFilter;
