import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const { height, width } = Dimensions.get('window');

const SIZE = width * 0.7;

const Page = ({
  title,
  index,
  translateX,
}: {
  title: string,
  index: number,
  translateX: Animated.SharedValue<number>,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` },
      ]}>
      <Animated.View style={[styles.square, rStyle]}></Animated.View>
      <Animated.View style={[rTextStyle, { position: 'absolute' }]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export const ScrollViewInter = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      style={styles.container}
      scrollEventThrottle={16}
      onScroll={scrollHandler}>
      {WORDS.map((title, index) => {
        return (
          <Page
            translateX={translateX}
            key={index.toString()}
            title={title}
            index={index}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256, 0.4)',
  },
  text: {
    fontSize: 70,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
