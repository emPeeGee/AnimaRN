import { StyleSheet,  View, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const wWidth = Dimensions.get('window').width
const SIZE = 100.0;
const CIRCLE_RADIUS = wWidth * 0.9 / 2;

type ContextType = {
  translateX: number
  translateY: number
}

export const PanGestureHand = () => {
  const translateX = useSharedValue(0);


  const translateY = useSharedValue(0);

  // TODO: wtf prettier is doing
  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (evt, ctx) => {
          ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (evt, ctx) => {
      translateX.value = ctx.translateX + evt.translationX;
      translateY.value = ctx.translateY + evt.translationY;
    },
    onEnd: (evt) => {
      // This line calculates the Euclidean distance between two points in a two-dimensional space.
      // But since we always compare with the center, which is 0, 0
      // No sense to include 0 in the calc
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      console.log(translateX.value, translateY.value, distance)
      
      // SIZE / 2 means, square should be completely outside of the circle to keep its position
      if (distance < CIRCLE_RADIUS + SIZE / 2)  {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, {translateY: translateY.value}],
    };
  });

  return (
      //  INFO: On Android gesture handler shouldn't be wrapper in view. Below code won't work
      // <View style={styles.container}>
      // <GestureHandlerRootView> 
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.square, rStyle]}></Animated.View>
          </PanGestureHandler>
          </View>
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    borderRadius: CIRCLE_RADIUS,
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'orange', 
    borderWidth: 5,
  }
});
