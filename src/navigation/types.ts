import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  VehicleDetail: { vehicleId: string };
  DetectionLive: { vehicleId: string };
  DriverReports: { driverId: string };
  Profile: undefined;
  AppBlocking: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Device: undefined;
  Insurance: undefined;
  Vehicles: undefined;
};
