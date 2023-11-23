import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import {
  GestureHandlerRootView,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Ripple: React.FC<{
  style?: StyleProp<ViewStyle>,
  onTap?: () => void,
  children: ReactNode,
}> = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const aRef = useAnimatedRef<View>();

  const width = useSharedValue(0)
  const height = useSharedValue(0)
  const rippleOpacity = useSharedValue(0)

  const tapGestureEvent =
    // prettier-ignore
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>( {
      onStart: ({x, y}) => {
        const layout = measure(aRef);
        width.value = layout.width;
        height.value = layout.height;

        centerX.value = x;
        centerY.value = y;

        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, {duration: 1000});
      },
      onActive: () => {
        // runOnJS(onTap()); INFO: it crashes
        onTap();
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    // Rectangle diagonal
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: 'rgba(0,0,0, 0.2)',
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: rippleOpacity.value,
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
    };
  });

  return (
    <View ref={aRef} style={style}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View style={[style, {overflow: 'hidden'}]}>
          <View>{children}</View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export const RippleEffect = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Ripple
        style={styles.ripple}
        onTap={() => {
          'worklet';
          console.log('tap');
        }}>
        <Text style={{ fontSize: 24 }}>Tap</Text>
      </Ripple>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    // Android
    elevation: 2,
  },
});
