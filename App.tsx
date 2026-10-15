import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  Outfit_900Black,
} from '@expo-google-fonts/outfit';
import {
  SourceSans3_300Light,
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
  SourceSans3_800ExtraBold,
  SourceSans3_900Black,
} from '@expo-google-fonts/source-sans-3';

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
import { fontFamilies } from './src/theme/typography';

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
    regular: { fontFamily: fontFamilies.body['400'], fontWeight: '400' },
    medium: { fontFamily: fontFamilies.body['500'], fontWeight: '500' },
    bold: { fontFamily: fontFamilies.body['700'], fontWeight: '700' },
    heavy: { fontFamily: fontFamilies.body['800'], fontWeight: '800' },
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
  // Outfit (headings) + Source Sans 3 (body). Keep the native splash up until they're ready.
  const [fontsLoaded, fontError] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
    SourceSans3_300Light,
    SourceSans3_400Regular,
    SourceSans3_500Medium,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
    SourceSans3_800ExtraBold,
    SourceSans3_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, backgroundColor: colors.splashBg }} />;
  }

  return (
    <PhoneFrame>
      <Wrapper style={{ flex: 1 }}>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: 'fade', animationDuration: 450 }} />
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
