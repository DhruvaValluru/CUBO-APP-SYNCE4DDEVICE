import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PhoneFrame } from './src/components/PhoneFrame';
import { SplashImage } from './src/components/SplashImage';
import { TabBar } from './src/components/TabBar';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { DetectionScreen } from './src/screens/DetectionScreen';
import { DeviceScreen } from './src/screens/DeviceScreen';
import { DriverReportsScreen } from './src/screens/DriverReportsScreen';
import { InsuranceScreen } from './src/screens/InsuranceScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { VehicleDetailScreen } from './src/screens/VehicleDetailScreen';
import { AppBlockingScreen } from './src/screens/AppBlockingScreen';
import { VehiclesScreen } from './src/screens/VehiclesScreen';
import { MainTabParamList, RootStackParamList } from './src/navigation/types';
import { colors } from './src/theme/colors';
import { fontAssets, fontFamilies, palette, paperTheme } from './src/theme/material';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navTheme: Theme = {
  dark: false,
  colors: {
    primary: palette.primary,
    background: palette.background,
    card: palette.surfaceContainerLowest,
    text: palette.onSurface,
    border: palette.outlineVariant,
    notification: palette.error,
  },
  fonts: {
    regular: { fontFamily: fontFamilies.regular, fontWeight: '400' },
    medium: { fontFamily: fontFamilies.medium, fontWeight: '400' },
    bold: { fontFamily: fontFamilies.bold, fontWeight: '400' },
    heavy: { fontFamily: fontFamilies.bold, fontWeight: '400' },
  },
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: 'Today' }} />
      <Tab.Screen name="Device" component={DeviceScreen} options={{ tabBarLabel: 'Device' }} />
      <Tab.Screen name="Insurance" component={InsuranceScreen} options={{ tabBarLabel: 'Insurance' }} />
      <Tab.Screen name="Vehicles" component={VehiclesScreen} options={{ tabBarLabel: 'Vehicles' }} />
    </Tab.Navigator>
  );
};

const Wrapper = Platform.OS === 'web' ? View : GestureHandlerRootView;

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const ready = fontsLoaded || !!fontError;

  return (
    <PhoneFrame>
      <PaperProvider theme={paperTheme}>
        <Wrapper style={{ flex: 1 }}>
          {ready ? (
            <NavigationContainer theme={navTheme}>
              <StatusBar style="dark" />
              <Stack.Navigator
                screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
              >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
                <Stack.Screen name="DriverReports" component={DriverReportsScreen} />
                <Stack.Screen name="DetectionLive" component={DetectionScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="AppBlocking" component={AppBlockingScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          ) : null}
          <SplashImage
            loading={!ready}
            backgroundColor={palette.surfaceContainerLowest}
            source={require('./assets/cubo/cubo-device.png')}
          />
        </Wrapper>
      </PaperProvider>
    </PhoneFrame>
  );
}
