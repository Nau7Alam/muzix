import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loaderBox}>
      <ActivityIndicator size="large" color={'#fdb5bb'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
