import { Text, SafeAreaView, View, Button, StyleSheet } from 'react-native';
import { backgroundColorGrouped } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { AnimationList } from './components/AnimationList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RingWave } from './components/RingWave';
import { CarouselFlat } from './components/CarouselFlatList';
import { ColorSwitcher } from './components/ColorSwitcher';
import ToastNotification from './components/ToastNotification';
import BasicGestures from './components/BasicGestures';
import { ZoomAndDrag } from './components/ZoomAndDrag';
import { TwitterProfile } from './components/TwitterProfile';
import { TwitterProfile2 } from './components/TwitterProfile2';
import { PanGestureHand } from './components/PanGestureHandler';

const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={AnimationList} />
          <Stack.Screen name="RingWave" component={RingWave} />
          <Stack.Screen name="FlatListCarousel" component={CarouselFlat} />
          <Stack.Screen name="ColorSwitcher" component={ColorSwitcher} />
          <Stack.Screen
            name="ToastNotification"
            component={ToastNotification}
          />
          <Stack.Screen name="BasicGestures" component={BasicGestures} />
          <Stack.Screen name="ZoomAndDrag" component={ZoomAndDrag} />
          <Stack.Screen name="TwitterProfile" component={TwitterProfile} />
          <Stack.Screen name="TwitterProfile2" component={TwitterProfile2} />
          <Stack.Screen name="PanGestureHand" component={PanGestureHand} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColorGrouped,
    justifyContent: 'center',
  },
});
