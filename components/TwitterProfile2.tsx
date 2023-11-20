import React, { useRef } from 'react';
import {
  Animated,
  Button,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function generateTweets(limit) {
  return new Array(limit).fill(0).map((_, index) => {
    const repetitions = Math.floor(Math.random() * 3) + 1;

    return {
      key: index.toString(),
      text: 'Lorem ipsum dolor amet '.repeat(repetitions),
      author: 'Arnaud',
      tag: 'eveningkid',
    };
  });
}

const PROFILE_BANNER_URI =
  'https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(20).webp';

const TWEETS = generateTweets(30);
const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 90;

export function TwitterProfile2() {
  // Keeps notches away
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

function App() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AnimatedImageBackground
        source={{
          uri: PROFILE_BANNER_URI,
        }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-200, 0],
                outputRange: [5, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
              }),
            },
          ],
        }}>
        <AnimatedBlurView
          tint="dark"
          intensity={96}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
            opacity: scrollY.interpolate({
              inputRange: [-50, 0, 50, 100],
              outputRange: [1, 0, 0, 1],
            }),
          }}
        />
      </AnimatedImageBackground>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
          // TODO: when native driver is false, it always logs, when not, it doesnt
          // { useNativeDriver: true },
        )}
        style={{
          zIndex: 3,
          marginTop: HEADER_HEIGHT_NARROWED,
          paddingTop: HEADER_HEIGHT_EXPANDED,
        }}>
        {TWEETS.map((item) => (
          <View
            key={item.key}
            style={{
              padding: 16,
              backgroundColor: 'orange',
              borderColor: 'green',
              borderWidth: 2,
            }}>
            <Button
              title="Press"
              onPress={() => console.log('scrollY', scrollY, animatedValue)}
            />
            <Text>{item.text}</Text>
            <Text>{item.author}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
  tweet: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
});
