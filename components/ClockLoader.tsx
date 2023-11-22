import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const N = 12;
const SQUARE_SIZE = 12;
// TODO: too much magic

const Square: React.FC<{
  index: number,
  progress: Animated.SharedValue<number>,
}> = ({ index, progress }) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }

    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }
    return withTiming(-index * SQUARE_SIZE);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        {
          height: SQUARE_SIZE,
          aspectRatio: 1,
          backgroundColor: 'white',
          opacity: (index + 1) / N,
          position: 'absolute',
        },
        rStyle,
      ]}
    />
  );
};

export const ClockLoader = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      {new Array(N).fill(0).map((_, idx) => {
        return <Square key={idx} index={idx} progress={progress} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
