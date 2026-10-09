import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { BottomNavigation, Icon } from 'react-native-paper';

const tabIcons: Record<string, [string, string]> = {
  Dashboard: ['view-dashboard', 'view-dashboard-outline'],
  Device: ['webcam', 'webcam'],
  Insurance: ['shield-check', 'shield-check-outline'],
  Vehicles: ['car', 'car-outline'],
};

/** Material 3 navigation bar (pill indicator) — the bottom bar style of the Fitbit app. */
export const TabBar = ({ state, descriptors, navigation, insets }: BottomTabBarProps) => (
  <BottomNavigation.Bar
    navigationState={state}
    safeAreaInsets={insets}
    shifting={false}
    onTabPress={({ route, preventDefault }) => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (event.defaultPrevented) {
        preventDefault();
      } else {
        navigation.dispatch({ ...CommonActions.navigate(route.name, route.params), target: state.key });
      }
    }}
    renderIcon={({ route, focused, color }) => {
      const [active, inactive] = tabIcons[route.name] ?? ['circle', 'circle-outline'];
      return <Icon source={focused ? active : inactive} size={24} color={color} />;
    }}
    getLabelText={({ route }) => {
      const { options } = descriptors[route.key];
      return typeof options.tabBarLabel === 'string' ? options.tabBarLabel : (options.title ?? route.name);
    }}
  />
);
