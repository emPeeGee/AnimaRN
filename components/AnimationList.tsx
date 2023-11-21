import {
  Button,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  SectionList,
} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {
  backgroundColorGrouped,
  fontColor,
  separatorColor,
  backgroundColorPlain,
} from '../theme';
import { ANIMATIONS } from '../animations';
import { Feather } from '@expo/vector-icons';

// todo: utils
const isLast = (array: unknown[], index: number) => index === array.length - 1;
const isSingle = (array: unknown[]) => array.length === 1;
const isEmpty = (array: unknown[]) => array.length === 0;

export function AnimationList({ animations = ANIMATIONS, navigation }) {
  return (
    <SectionList
      sections={animations}
      style={styles.list}
      ListFooterComponentStyle={styles.footer}
      ListFooterComponent={() => <View />}
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
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeading}>{title}</Text>
      )}
      renderItem={({ item, index, section }) => {
        return (
          <Pressable onPress={() => navigation.navigate(item.name)}>
            <View
              style={[
                styles.itemContainer,
                // if item is the last and not single
                isLast(section.data, index) &&
                  !isSingle(section.data) &&
                  styles.lastItem,
              ]}>
              <Text>{item.icon}</Text>
              <View style={styles.itemTitleContainer}>
                <Text numberOfLines={1} style={styles.itemTitle}>
                  {item.title}
                </Text>
              </View>
              {Platform.OS === 'ios' ? (
                <Button title="→" />
              ) : (
                <Feather name="arrow-right" />
              )}
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
    // borderBottomWidth: 1,
    // borderBottomColor: separatorColor,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    // marginVertical: 12, // INFO: On Android looks weird with it
    backgroundColor: backgroundColorPlain,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: fontColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  footer: {
    paddingVertical: 8,
    backgroundColor: backgroundColorGrouped,
  },
});
