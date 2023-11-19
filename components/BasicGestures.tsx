import { View, Text, Animated, useWindowDimensions } from 'react-native';
import React, { useRef } from 'react';

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

const BasicGestures = () => {
  const dimensions = useWindowDimensions();
  const touch = useRef(
    new Animated.ValueXY({
      x: dimensions.width / 2 + CURSOR_HALF_SIDE_SIZE,
      y: dimensions.height / 2 + CURSOR_HALF_SIDE_SIZE,
    }),
  ).current;

  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={() => true}
      onResponderMove={(event) => {
        touch.setValue({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
      }}
      onResponderRelease={() => {
        Animated.spring(touch, {
          toValue: {
            x: dimensions.width / 2 + CURSOR_HALF_SIDE_SIZE,
            y: dimensions.height / 2 + CURSOR_HALF_SIDE_SIZE,
          },
          // left/top not supported by native driver
          useNativeDriver: false,
        }).start();
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
          top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
          height: CURSOR_SIDE_SIZE,
          width: CURSOR_SIDE_SIZE,
          borderRadius: CURSOR_HALF_SIDE_SIZE,
          backgroundColor: 'orange',
        }}
      />
    </View>
  );
};

export default BasicGestures;
