import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { Circle, Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6e1FA';

const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI * R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressBar = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onRun = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.progressText}>{progressText.value}</Text> */}
      <ReText text={progressText} style={styles.progressText} />
      <Svg style={{ position: 'absolute', bottom: 60 }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          fill="transparent"
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />

        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          fill="transparent"
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>

      <Pressable style={styles.button} onPress={onRun}>
        <Text style={styles.buttonText}>Run</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    backgroundColor: BACKGROUND_STROKE_COLOR,
    bottom: 80,
    width: width * 0.7,
    height: 60,
    position: 'absolute',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    letterSpacing: 2.0,
  },
});
