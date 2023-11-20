import React, { useRef } from 'react';
import {
  PanResponder,
  View,
  Animated,
  useWindowDimensions,
} from 'react-native';

const IMAGE_URI =
  'https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638';

const pointsDistance = ([xA, yA], [xB, yB]) => {
  return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
};

export const ZoomAndDrag = () => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;
  const dimensions = useWindowDimensions();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTouches = evt.nativeEvent.changedTouches.length;

        if (activeTouches === 1) {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        } else if (activeTouches >= 2) {
          const [touchA, touchB] = evt.nativeEvent.changedTouches;
          // Distance between two finders
          const distance = pointsDistance(
            [touchA.pageX, touchA.pageY],
            [touchB.pageX, touchB.pageY],
          );

          const screenMovedPercents = distance / dimensions.width;
          const newScale = 1 + screenMovedPercents * 3;
          // TODO: on first scale, it jumps
          scale.setValue(newScale);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }),
  ).current;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={{ uri: IMAGE_URI }}
        style={{
          height: 200,
          width: '90%',
          borderRadius: 10,
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
          // The same
          // transform: pan.getTranslateTransform()
        }}
      />
    </View>
  );
};
