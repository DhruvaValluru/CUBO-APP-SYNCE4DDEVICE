import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PhoneFrame } from './src/components/PhoneFrame';
import { TabBar } from './src/components/TabBar';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { DetectionScreen } from './src/screens/DetectionScreen';
import { DriverReportsScreen } from './src/screens/DriverReportsScreen';
import { InsuranceScreen } from './src/screens/InsuranceScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { VehicleDetailScreen } from './src/screens/VehicleDetailScreen';
import { AppBlockingScreen } from './src/screens/AppBlockingScreen';
import { VehiclesScreen } from './src/screens/VehiclesScreen';
import { MainTabParamList, RootStackParamList } from './src/navigation/types';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.accentLime,
    background: colors.background,
    card: colors.card,
    text: colors.text,
    border: colors.border,
    notification: colors.danger,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: 'Dashboard' }} />
      <Tab.Screen name="Insurance" component={InsuranceScreen} options={{ tabBarLabel: 'Insurance' }} />
      <Tab.Screen name="Vehicles" component={VehiclesScreen} options={{ tabBarLabel: 'Vehicles' }} />
    </Tab.Navigator>
  );
};

const Wrapper = Platform.OS === 'web' ? View : GestureHandlerRootView;

export default function App() {
  return (
    <PhoneFrame>
      <Wrapper style={{ flex: 1 }}>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="DriverReports" component={DriverReportsScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="DetectionLive" component={DetectionScreen} options={{ animation: 'fade_from_bottom' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="AppBlocking" component={AppBlockingScreen} options={{ animation: 'slide_from_right' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Wrapper>
    </PhoneFrame>
  );
}
