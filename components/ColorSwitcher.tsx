import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const colors = {
  dark: {
    background: '#1e1e1e',
    circle: '#252525',
    text: '#f8f8f8',
  },
  light: {
    background: '#f8f8f8',
    circle: '#fff',
    text: '#1e1e1e',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(255, 0, 255, 0.2)',
  false: 'rgba(0, 0, 0, 0.1)',
};

type Theme = 'light' | 'dark';

export const ColorSwitcher = () => {
  const [theme, setTheme] = useState('light');
  // TODO: it doesn't work
  // const [theme, setTheme] = useState<Theme>('light';
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.background, colors.dark.background],
    );

    return { backgroundColor };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.circle, colors.dark.circle],
    );

    return { backgroundColor };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colors.light.text, colors.dark.text],
    );

    return { color };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
};

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  text: {
    fontSize: 70,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 32,
  },
});
