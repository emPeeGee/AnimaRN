import { Button, FlatList, Pressable, SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {
  backgroundColorGrouped,
  fontColor,
  separatorColor,
  backgroundColorPlain,
} from '../theme';

const animations = [
  {
    icon: '🌊',
    title: 'Phone ring indicator wave (Moti & Reanimated)',
    name: 'RingWave',
  },
  { icon: '🚀', title: 'Carousel FlatList (Animated)' },
  {
    icon: '💡',
    title: 'Color switcher animation by interpolating (Reanimated)',
  },
  { icon: '🌈', title: 'Toast notification (Animated)' },
  {
    icon: '🔮',
    title: 'Basic of RN gestures (Animated)',
    name: 'BasicGestures',
  },
  { icon: '🎥', title: 'Zoom and Drag (Animated)', name: 'ZoonAndDrag' },
  { icon: '🦜', title: 'Twitter Profile (Animated)', name: 'TwitterProfile' },
  {
    icon: '🧪',
    title: 'Twitter Profile2 (Testing Animated.Event) (Animated)',
    name: 'TwitterProfile2',
  },
  {
    icon: '️🥘',
    title: 'PanGestureHandler (Reanimated)',
    name: 'PanGestureHand',
  },
  // TODO: next 3 circles animation
  { icon: '⚽️', title: '3 loading circles', name: 'LoadingCircles' },
];

// todo: utils
const isLast = (array: unknown[], index: number) => index === array.length - 1;

export function AnimationList({ navigation }) {
  return (
    <FlatList
      data={animations}
      style={styles.list}
      horizontal={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={() => {
        return (
          // TODO: heading becomes smaller when scrolling as on ios
          <View style={styles.heading}>
            <Text style={styles.titleText}>Animations</Text>
            <Text style={styles.description}>
              Explore enchanting animations for a delightful mobile experience,
              from subtle transitions to lively celebrations.
            </Text>
          </View>
        );
      }}
      renderItem={({ item, index }) => {
        return (
          <Pressable onPress={() => navigation.navigate(item.name)}>
            <View
              style={[
                styles.itemContainer,
                isLast(animations, index) && styles.lastItem,
              ]}>
              <Text>{item.icon}</Text>
              <View style={styles.itemTitleContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <Button title="→" />
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 12,
    paddingTop: 48,
    paddingBottom: 8,
    backgroundColor: backgroundColorGrouped,
    borderBottomWidth: 1,
    borderBottomColor: separatorColor,
  },
  description: {
    color: fontColor,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4,
    color: fontColor,
  },
  listContent: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: separatorColor,
    marginVertical: 12,
    backgroundColor: backgroundColorPlain,
  },
  list: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  itemContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: fontColor,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: separatorColor,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    color: fontColor,
  },
  itemArrow: {
    padding: 0,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});
