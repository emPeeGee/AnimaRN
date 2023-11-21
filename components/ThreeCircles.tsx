import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

const ThreeCircles = () => {
  const trY1 = useSharedValue(0);
  const trY2 = useSharedValue(0);
  const trY3 = useSharedValue(0);

  useEffect(() => {
    trY1.value = withRepeat(
      withSequence(
        withDelay(1000, withSpring(-25, { duration: 1000 })),
        withDelay(2500, withSpring(0, { duration: 1000 })),
      ),
      -1,
    );
    trY2.value = withRepeat(
      withSequence(
        withDelay(2000, withSpring(-25, { duration: 1000 })),
        withDelay(1500, withSpring(0, { duration: 1000 })),
      ),
      -1,
    );
    trY3.value = withRepeat(
      withSequence(
        withDelay(3000, withSpring(-25, { duration: 1000 })),
        withDelay(500, withSpring(0, { duration: 1000 })),
      ),
      -1,
    );
  }, []);

  const rSt1 = useAnimatedStyle(() => ({
    transform: [{ translateY: trY1.value }],
  }));

  const rSt2 = useAnimatedStyle(() => ({
    transform: [{ translateY: trY2.value }],
  }));

  const rSt3 = useAnimatedStyle(() => ({
    transform: [{ translateY: trY3.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, rSt1]} />
      <Animated.View style={[styles.circle, rSt2]} />
      <Animated.View style={[styles.circle, rSt3]} />
    </View>
  );
};

export default ThreeCircles;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  circle: {
    width: 30,
    height: 30,
    margin: 6,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
});
