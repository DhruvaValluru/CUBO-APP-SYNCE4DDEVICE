import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Divider } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { evaIcon } from './kitten/icons';

const tabIcons: Record<string, [string, string]> = {
  Dashboard: ['activity', 'activity-outline'],
  Device: ['video', 'video-outline'],
  Insurance: ['shield', 'shield-outline'],
  Vehicles: ['car', 'car-outline'],
};

/** kittenTricks home bottom navigation: Divider + Eva BottomNavigation without indicator. */
export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const onSelect = (index: number) => {
    const route = state.routes[index];
    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
    if (state.index !== index && !event.defaultPrevented) navigation.navigate(route.name);
  };

  return (
    <View style={styles.outer}>
      <Divider />
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={onSelect}
        style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      >
        {state.routes.map((route, index) => {
          const options = descriptors[route.key].options;
          const title = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : (options.title ?? route.name);
          const [filled, outline] = tabIcons[route.name] ?? ['radio-button-on', 'radio-button-off'];
          return (
            <BottomNavigationTab key={route.key} title={title} icon={evaIcon(state.index === index ? filled : outline)} />
          );
        })}
      </BottomNavigation>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
