import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: require('../assets/cutie.png'),
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: require('../assets/icecream.png'),
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: require('../assets/kitty.png'),
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: require('../assets/pikachu.png'),
  },
];

const Indicator = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
      }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.5, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              margin: 6,
              opacity,
              transform: [{ scale }],
            }}
            key={i}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  // TODO: what is interpolate
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor, position: 'absolute' },
      ]}
    />
  );
};

const Square = ({ scrollX }: { scrollX: Animated.Value }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height * 0.9,
        height: height * 0.9,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }],
      }}
    />
  );
};

export function CarouselFlat() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        horizontal
        data={DATA}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 28,
                    marginBottom: 10,
                    color: 'white',
                  }}>
                  {item.title}
                </Text>
                <Text style={{ fontWeight: '300', color: 'white' }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
