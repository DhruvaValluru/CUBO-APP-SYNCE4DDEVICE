export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  VehicleDetail: { vehicleId: string };
  DetectionLive: { vehicleId: string };
  DriverReports: { driverId: string };
  Profile: undefined;
  AppBlocking: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Insurance: undefined;
  Vehicles: undefined;
};
