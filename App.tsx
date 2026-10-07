import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';
import type { CustomSchemaType } from '@ui-kitten/processor';
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
import { colors, evaPalette } from './src/theme/colors';
import mapping from './src/theme/mapping.json';
import { cuboEvaTheme } from './src/theme/eva';

// Partial override (font + TopNavigation alignment); Eva's types expect full component schemas
const customMapping = mapping as unknown as CustomSchemaType;

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
      <Tab.Screen name="Device" component={DeviceScreen} options={{ tabBarLabel: 'Device' }} />
      <Tab.Screen name="Insurance" component={InsuranceScreen} options={{ tabBarLabel: 'Insurance' }} />
      <Tab.Screen name="Vehicles" component={VehiclesScreen} options={{ tabBarLabel: 'Vehicles' }} />
    </Tab.Navigator>
  );
};

const Wrapper = Platform.OS === 'web' ? View : GestureHandlerRootView;

export default function App() {
  // kittenTricks loads Open Sans before mounting and maps it as Eva's text font
  const [fontsLoaded, fontError] = useFonts({
    'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
  });
  const ready = fontsLoaded || !!fontError;

  return (
    <PhoneFrame>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} customMapping={customMapping} theme={cuboEvaTheme}>
        <Wrapper style={{ flex: 1 }}>
          {ready ? (
            <NavigationContainer theme={navTheme}>
              <StatusBar style="light" />
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
            backgroundColor={evaPalette.basic1000}
            source={require('./assets/cubo/cubo-device.png')}
          />
        </Wrapper>
      </ApplicationProvider>
    </PhoneFrame>
  );
}
